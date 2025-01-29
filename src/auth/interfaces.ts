import { Token } from '@prisma/client';

export interface Tokens {
  accesToken: string;
  refreshToken: Token;
  _user: any;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}
