import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { ProjectTags } from '@prisma/client';

@Injectable()
export class ProjectTagsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createProjectTag(
    projectId?: number,
    tagId?: number,
  ): Promise<ProjectTags> {
    const _tagId: string = tagId.toString();

    return await this.databaseService.projectTags.create({
      data: {
        projectId: projectId,
        tagId: parseInt(_tagId),
      },
    });
  }

  async getProjectTags(projectId: number): Promise<ProjectTags[]> {
    return await this.databaseService.projectTags.findMany({
      where: { projectId },
    });
  }

  async deleteProjectTag(projectTagId: number): Promise<ProjectTags> {
    return await this.databaseService.projectTags.delete({
      where: { id: projectTagId },
    });
  }

  async isProjectTagExist(projectId: number, tagId: number): Promise<boolean> {
    const _tagId: string = tagId.toString();

    const isExist = await this.databaseService.projectTags.findFirst({
      where: { tagId: parseInt(_tagId), projectId },
    });
    // console.log(true ? isExist !== null : false);

    return true ? isExist !== null : false;
  }
}
