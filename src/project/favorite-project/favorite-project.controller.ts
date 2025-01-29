import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FavoriteProjectService } from './favorite-project.service';
import { FavoriteProject } from '@prisma/client';

@Controller('project/favorite')
export class FavoriteProjectController {
  constructor(
    private readonly favoriteProjectsService: FavoriteProjectService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserFavoriteProjects(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FavoriteProject[]> {
    return this.favoriteProjectsService.getUserFavoriteProjects(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':userId/:projectId')
  async createUserFavoriteProjects(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<FavoriteProject> {
    return this.favoriteProjectsService.createUserFavoriteProject(
      userId,
      projectId,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':userId/:projectId')
  async deleteUserFavoriteProject(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<FavoriteProject> {
    return this.favoriteProjectsService.deleteUserFavoriteProject(
      userId,
      projectId,
    );
  }
}
