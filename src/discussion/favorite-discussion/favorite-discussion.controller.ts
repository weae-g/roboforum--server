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
import { FavoriteDiscussionService } from './favorite-discussion.service';
import { FavoriteDiscussion } from '@prisma/client';

@Controller('discussion/favorite')
export class FavoriteDiscussionController {
  constructor(
    private readonly favoriteDiscussionsService: FavoriteDiscussionService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserFavoriteDiscussions(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FavoriteDiscussion[]> {
    return this.favoriteDiscussionsService.getUserFavoriteDiscussions(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':userId/:discussionId')
  async createUserFavoriteDiscussions(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('discussionId', ParseIntPipe) discussionId: number,
  ): Promise<FavoriteDiscussion> {
    return this.favoriteDiscussionsService.createUserFavoriteDiscussion(
      userId,
      discussionId,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':userId/:discussionId')
  async deleteUserFavoriteDiscussion(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('discussionId', ParseIntPipe) discussionId: number,
  ): Promise<FavoriteDiscussion> {
    return this.favoriteDiscussionsService.deleteUserFavoriteDiscussion(
      userId,
      discussionId,
    );
  }
}
