import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { Project, ProjectType } from '@prisma/client';

@Controller('project/type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':projectId')
  async getProjectType(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectType> {
    return this.projectTypeService.getProjectType(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':projectId')
  async updateProjectType(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() projectTypeId: number,
  ): Promise<Project> {
    return this.projectTypeService.updateProjectType(projectId, projectTypeId);
  }
}
