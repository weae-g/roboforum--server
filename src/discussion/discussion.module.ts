import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionFilesModule } from './discussion-files/discussion-files.module';
import { DiscussionCommentModule } from './discussion-comment/discussion-comment.module';
import { FavoriteDiscussionModule } from './favorite-discussion/favorite-discussion.module';
import { DiscussionController } from './discussion.controller';
import { DiscussionTagsModule } from './discussion-tags/discussion-tags.module';
import { DatabaseService } from '@database/database.service';
import { DiscussionTagsService } from './discussion-tags/discussion-tags.service';

@Module({
  providers: [DiscussionService, DatabaseService, DiscussionTagsService],
  imports: [
    DiscussionFilesModule,
    DiscussionCommentModule,
    FavoriteDiscussionModule,
    DiscussionTagsModule,
  ],
  controllers: [DiscussionController],
})
export class DiscussionModule {}
