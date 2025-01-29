import { Module } from '@nestjs/common';
import { FavoriteDiscussionService } from './favorite-discussion.service';
import { FavoriteDiscussionController } from './favorite-discussion.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [FavoriteDiscussionService, DatabaseService],
  controllers: [FavoriteDiscussionController],
})
export class FavoriteDiscussionModule {}
