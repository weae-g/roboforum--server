import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserSocialsService } from './user-socials.service';
import { UserSocials } from '@prisma/client';
import { CreateUserSocialsDto } from '@user/dto/user-socials.dto';

@Controller('user/socials')
export class UserSocialsController {
  constructor(private readonly userSocialsService: UserSocialsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<UserSocials[]> {
    return this.userSocialsService.getUserSocials(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateUserSocialsDto[],
  ): Promise<UserSocials[]> {
    return this.userSocialsService.createUserSocials(id, dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':profileId/:linkId')
  async delete(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Param('linkId', ParseIntPipe) linkId: number,
  ): Promise<UserSocials> {
    return this.userSocialsService.deleteUserSocialLink(profileId, linkId);
  }
}
