import { Module } from '@nestjs/common';
import { ProjectFilesService } from './project-files.service';
import { ProjectFilesController } from './project-files.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [ProjectFilesService, DatabaseService],
  controllers: [ProjectFilesController],
  exports: [ProjectFilesService],
})
export class ProjectFilesModule {}
