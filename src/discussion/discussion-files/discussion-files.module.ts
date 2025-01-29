import { Module } from '@nestjs/common';
import { DiscussionFilesService } from './discussion-files.service';
import { DiscussionFilesController } from './discussion-files.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [DiscussionFilesService, DatabaseService],
  controllers: [DiscussionFilesController],
  exports: [DiscussionFilesService],
})
export class DiscussionFilesModule {}
