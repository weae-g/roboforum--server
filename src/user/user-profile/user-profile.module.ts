import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { DatabaseService } from '@database/database.service';
import { UserSocialsService } from '@user/user-socials/user-socials.service';

@Module({
  providers: [UserProfileService, UserSocialsService, DatabaseService],
  controllers: [UserProfileController],
  exports: [UserProfileService],
})
export class UserProfileModule {}
