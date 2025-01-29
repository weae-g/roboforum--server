import { Module } from '@nestjs/common';
import { UserCommentService } from './user-comment.service';
import { UserCommentController } from './user-comment.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [UserCommentService, DatabaseService],
  controllers: [UserCommentController],
})
export class UserCommentModule {}
