import { Module } from '@nestjs/common';
import { ProjectTagsService } from './project-tags.service';
import { ProjectTagsController } from './project-tags.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [ProjectTagsService, DatabaseService],
  controllers: [ProjectTagsController],
})
export class ProjectTagsModule {}
