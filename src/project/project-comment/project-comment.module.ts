import { Module } from '@nestjs/common';
import { ProjectCommentService } from './project-comment.service';
import { ProjectCommentController } from './project-comment.controller';
import { DatabaseService } from '@database/database.service';
import { UserCommentService } from '@user/user-comment/user-comment.service';

@Module({
  providers: [ProjectCommentService, DatabaseService, UserCommentService],
  controllers: [ProjectCommentController],
  exports: [ProjectCommentService],
})
export class ProjectCommentModule {}
