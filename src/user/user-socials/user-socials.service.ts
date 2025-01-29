import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { UserSocials } from '@prisma/client';

@Injectable()
export class UserSocialsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserSocials(id: number): Promise<UserSocials[]> {
    return this.databaseService.userSocials.findMany({
      where: { userProfileId: id },
    });
  }

  async createUserSocials(profileId: number, dto: any): Promise<UserSocials[]> {
    const userSocials = [];

    for (let i = 0; i < dto.length; i++) {
      const parsedDto = JSON.parse(dto[i]);
      const us: any = await this.databaseService.userSocials.create({
        data: {
          userProfileId: profileId,
          link: parsedDto.link,
          resource: parsedDto.resource,
        },
      });

      userSocials.push(us);
    }

    return userSocials;
  }

  async updateUserSocials(dto: any): Promise<UserSocials[]> {
    const userSocials = [];

    for (let i = 0; i < dto.length; i++) {
      const parsedDto = JSON.parse(dto[i]);
      const us: any = await this.databaseService.userSocials.update({
        where: { id: parsedDto.id },
        data: {
          link: parsedDto.link,
          resource: parsedDto.resource,
        },
      });

      userSocials.push(us);
    }

    return userSocials;
  }

  async deleteUserSocialLink(
    profileId: number,
    linkId: number,
  ): Promise<UserSocials> {
    return this.databaseService.userSocials.delete({
      where: {
        userProfileId: profileId,
        id: linkId,
      },
    });
  }
}
