import { Module } from '@nestjs/common';
import { DiscussionCommentService } from './discussion-comment.service';
import { DiscussionCommentController } from './discussion-comment.controller';
import { DatabaseService } from '@database/database.service';
import { UserCommentService } from '@user/user-comment/user-comment.service';

@Module({
  providers: [DiscussionCommentService, DatabaseService, UserCommentService],
  controllers: [DiscussionCommentController],
})
export class DiscussionCommentModule {}
