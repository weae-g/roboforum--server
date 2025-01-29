import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectTagsService } from './project-tags.service';
import { ProjectTagsDto } from './dto';
import { ProjectTags } from '@prisma/client';

@Controller('project/tags')
export class ProjectTagsController {
  constructor(private readonly projectTagsService: ProjectTagsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async postTagToProject(@Body() dto: ProjectTagsDto): Promise<ProjectTags> {
    return this.projectTagsService.createProjectTag(dto.projectId, dto.tagId);
  }
}
