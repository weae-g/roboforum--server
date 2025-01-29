import { UserProfileModule } from '@user/user-profile/user-profile.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseService } from '@database/database.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UserController } from './user.controller';
import { UserSocialsModule } from './user-socials/user-socials.module';
import { UserCommentModule } from './user-comment/user-comment.module';

@Module({
  providers: [UserService, DatabaseService],
  exports: [UserService],
  controllers: [UserController],
  imports: [UserProfileModule, UserSocialsModule, CacheModule.register(), UserCommentModule],
})
export class UserModule {}
