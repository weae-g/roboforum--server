import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectFilesModule } from './project-files/project-files.module';
import { ProjectCommentModule } from './project-comment/project-comment.module';
import { FavoriteProjectModule } from './favorite-project/favorite-project.module';
import { ProjectTypeModule } from './project-type/project-type.module';
import { ProjectController } from './project.controller';
import { DatabaseService } from '@database/database.service';
import { ProjectTagsModule } from './project-tags/project-tags.module';
import { ProjectTagsService } from './project-tags/project-tags.service';

@Module({
  providers: [ProjectService, ProjectTagsService, DatabaseService],
  imports: [
    ProjectFilesModule,
    ProjectCommentModule,
    FavoriteProjectModule,
    ProjectTypeModule,
    ProjectTagsModule,
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
