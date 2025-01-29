import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { FavoriteProject } from '@prisma/client';

@Injectable()
export class FavoriteProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserFavoriteProjects(userId: number): Promise<FavoriteProject[]> {
    return this.databaseService.favoriteProject.findMany({
      where: { userId },
      include: {
        project: true,
      },
    });
  }

  async createUserFavoriteProject(
    userId: number,
    projectId: number,
  ): Promise<FavoriteProject> {
    const project = await this.databaseService.favoriteProject.findFirst({
      where: {
        userId,
        projectId,
      },
    });

    if (!project) {
      return this.databaseService.favoriteProject.create({
        data: {
          userId: userId,
          projectId: projectId,
        },
      });
    }
  }

  async deleteUserFavoriteProject(
    userId: number,
    projectId: number,
  ): Promise<FavoriteProject> {
    const userFavoriteProject =
      await this.databaseService.favoriteProject.findMany({
        where: {
          userId,
        },
      });

    const uniqueProject = await userFavoriteProject.filter(
      (i) => i.projectId == projectId,
    );

    return this.databaseService.favoriteProject.delete({
      where: {
        id: uniqueProject[0].id,
      },
    });
  }
}
