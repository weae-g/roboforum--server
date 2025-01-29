import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { ProjectTypeController } from './project-type.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [ProjectTypeService, DatabaseService],
  controllers: [ProjectTypeController],
  exports: [ProjectTypeService],
})
export class ProjectTypeModule {}
