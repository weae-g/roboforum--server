import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { User, Token, Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
    const token = await this.databaseService.token.findUnique({
      where: { token: refreshToken },
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.databaseService.token.delete({
      where: { token: refreshToken },
    });

    if (new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }

    const user: User = await this.databaseService.user.findUnique({
      where: { id: token.userId },
    });

    return this.generateTokens(user, agent);
  }

  async register(dto: RegisterDto) {
    const userEmail: User = await this.userService
      .findOne(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (userEmail) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }

    return this.userService.save(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: LoginDto, agent: string): Promise<Tokens> {
    const user: User = await this.userService
      .findOne(dto.email, true)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль!');
    }

    return this.generateTokens(user, agent);
  }

  private async generateTokens(user: User, agent: string): Promise<Tokens> {
    const userRole: Role = await this.databaseService.role.findUnique({
      where: { id: user.roleId },
    });

    const accesToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: userRole.name,
      });

    const refreshToken = await this.getRefreshToken(user.id, agent);

    const _user = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: userRole.name,
    };

    return { accesToken, refreshToken, _user };
  }

  private async getRefreshToken(userId: number, agent: string): Promise<Token> {
    const _currentToken = await this.databaseService.token.findFirst({
      where: { userId, userAgent: agent },
    });

    const currentToken = _currentToken?.token ?? '';

    const newToken = await this.databaseService.token.upsert({
      where: { token: currentToken },
      update: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userAgent: agent,
        userId,
      },
    });

    return newToken;
  }

  deleteRefreshToken(token: string) {
    return this.databaseService.token.delete({ where: { token } });
  }
}
