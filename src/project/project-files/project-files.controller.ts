import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectFilesService } from './project-files.service';
import { ProjectFiles } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('project/files')
export class ProjectFilesController {
  constructor(private readonly projectFilesService: ProjectFilesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':projectId')
  async getProjectFiles(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectFiles[]> {
    return this.projectFilesService.getProjectFiles(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':fileId')
  async deleteProjectFile(
    @Param('fileId', ParseIntPipe) fileId: number,
  ): Promise<ProjectFiles> {
    return this.projectFilesService.deleteProjectFile(fileId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FilesInterceptor('file'))
  @Post(':projectId')
  async createProjectFile(
    @Param('projectId', ParseIntPipe) projectId: number,
    @UploadedFiles() file: Express.Multer.File,
  ): Promise<ProjectFiles> {
    return this.projectFilesService.createProjectFile(projectId, file);
  }
}
