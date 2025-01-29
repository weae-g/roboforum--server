import { Module } from '@nestjs/common';
import { UserSocialsService } from './user-socials.service';
import { UserSocialsController } from './user-socials.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [UserSocialsService, DatabaseService],
  controllers: [UserSocialsController],
})
export class UserSocialsModule {}
