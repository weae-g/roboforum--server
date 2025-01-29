import { Module } from '@nestjs/common';
import { DiscussionTagsController } from './discussion-tags.controller';
import { DiscussionTagsService } from './discussion-tags.service';
import { DatabaseService } from '@database/database.service';

@Module({
  controllers: [DiscussionTagsController],
  providers: [DiscussionTagsService, DatabaseService],
})
export class DiscussionTagsModule {}
