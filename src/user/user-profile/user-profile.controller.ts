import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UpdateUserProfileDto } from '../dto/user-profile.dto';
import { UserProfile } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
@Controller('user/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async get(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProfileService.getUserProfile(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FilesInterceptor('image'))
  @Put(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserProfileDto,
    @UploadedFiles() image: Express.Multer.File,
  ): Promise<UserProfile> {
    return this.userProfileService.updateUserProfile(userId, dto, image);
  }
}
