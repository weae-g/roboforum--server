import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { FavoriteDiscussion } from '@prisma/client';

@Injectable()
export class FavoriteDiscussionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserFavoriteDiscussions(
    userId: number,
  ): Promise<FavoriteDiscussion[]> {
    return this.databaseService.favoriteDiscussion.findMany({
      where: { userId },
      include: {
        discussion: true,
      },
    });
  }

  async createUserFavoriteDiscussion(
    userId: number,
    discussionId: number,
  ): Promise<FavoriteDiscussion> {
    const discussion = await this.databaseService.favoriteDiscussion.findFirst({
      where: {
        userId,
        discussionId,
      },
    });

    if (!discussion) {
      return this.databaseService.favoriteDiscussion.create({
        data: {
          userId: userId,
          discussionId: discussionId,
        },
      });
    }
  }

  async deleteUserFavoriteDiscussion(
    userId: number,
    discussionId: number,
  ): Promise<FavoriteDiscussion> {
    const userFavoriteDiscussion =
      await this.databaseService.favoriteDiscussion.findMany({
        where: {
          userId,
        },
      });

    const uniqueDiscussion = await userFavoriteDiscussion.filter(
      (i) => i.discussionId == discussionId,
    );

    return this.databaseService.favoriteDiscussion.delete({
      where: {
        id: uniqueDiscussion[0].id,
      },
    });
  }
}
