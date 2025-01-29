import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Param,
  Body,
  ParseIntPipe,
  ClassSerializerInterceptor,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Project } from '@prisma/client';
import { Public } from '@common/decorators';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserProjects(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Project[]> {
    const projects = await this.projectService.getUserProjects(userId);
    return projects;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('one/:projectId')
  async getOneUserProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<Project> {
    return this.projectService.getOneUserProject(projectId);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('public')
  async getPublicProjects(): Promise<Project[]> {
    const projects = await this.projectService.getPublicProjects();
    return projects;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectService.getAllProjects();
    return projects;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseInterceptors(FilesInterceptor('projectFiles'))
  async createProject(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() projectDto: ProjectDto,
  ) {
    const projectAndFiles = await this.projectService.createUserProject(
      projectDto,
      files,
    );
    return projectAndFiles;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':projectId')
  @UseInterceptors(FilesInterceptor('projectFiles'))
  async updateProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @UploadedFiles() files?: Array<Express.Multer.File>,
    @Body() projectDto?: ProjectDto,
  ) {
    const projectAndFiles = await this.projectService.updateUserProject(
      projectId,
      projectDto,
      files,
    );
    return projectAndFiles;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':projectId/:imageId')
  async deleteProjectImage(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ): Promise<Project> {
    const project = await this.projectService.deleteProjectImage(
      projectId,
      imageId,
    );
    return project;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':projectId')
  async deleteUserProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<Project> {
    const project = await this.projectService.deleteUserProject(projectId);
    return project;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/search/:searchTerm')
  async searchProjects(
    @Param('searchTerm') searchTerm: string,
  ): Promise<Project[]> {
    const projects = await this.projectService.searchProjects(searchTerm);
    return projects;
  }
}
