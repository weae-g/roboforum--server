import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { DiscussionTags } from '@prisma/client';

@Injectable()
export class DiscussionTagsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createDiscussionTag(
    discussionId?: number,
    tagId?: number,
  ): Promise<DiscussionTags> {
    const _tagId: string = tagId.toString();

    return await this.databaseService.discussionTags.create({
      data: {
        discussionId: discussionId,
        tagId: parseInt(_tagId),
      },
    });
  }

  async getDiscussionTags(discussionId: number): Promise<DiscussionTags[]> {
    return await this.databaseService.discussionTags.findMany({
      where: { discussionId },
    });
  }

  async deleteDiscussionTag(discussionTagId: number): Promise<DiscussionTags> {
    return await this.databaseService.discussionTags.delete({
      where: { id: discussionTagId },
    });
  }

  async isDiscussionTagExist(
    discussionId: number,
    tagId: number,
  ): Promise<boolean> {
    const _tagId: string = tagId.toString();

    const isExist = await this.databaseService.discussionTags.findFirst({
      where: { tagId: parseInt(_tagId), discussionId },
    });
    // console.log(true ? isExist !== null : false);

    return true ? isExist !== null : false;
  }
}
