import {
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ProjectCommentService } from './project-comment.service';
import { ProjectComment, ProjectCommentFork } from '@prisma/client';
import { ProjectCommentDto } from '@project/dto';
import { Public } from '@common/decorators';

@Controller('project/comment')
export class ProjectCommentController {
  constructor(private readonly projectCommentService: ProjectCommentService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':projectId')
  async getProjectComments(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectComment[]> {
    return this.projectCommentService.getProjectComments(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':projectId')
  async postUserProjectComment(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: ProjectCommentDto,
  ): Promise<ProjectComment> {
    return this.projectCommentService.postUserProjectComment(projectId, dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('answer/:projectId')
  async postUserProjectCommentAnswer(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: ProjectCommentDto,
  ): Promise<ProjectCommentFork> {
    return this.projectCommentService.postUserProjectCommentAnswer(
      projectId,
      dto,
    );
  }
}
