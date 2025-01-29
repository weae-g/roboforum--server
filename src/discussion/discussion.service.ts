import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Discussion } from '@prisma/client';
import { DiscussionAndFiles, DiscussionDto } from './dto/discussion.dto';

import * as fs from 'fs/promises';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';
import { DiscussionTagsService } from './discussion-tags/discussion-tags.service';

@Injectable()
export class DiscussionService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly discussionTagsService: DiscussionTagsService,
  ) {}

  async getUserDiscussions(userId: number): Promise<Discussion[]> {
    return this.databaseService.discussion.findMany({
      where: { userId },
      orderBy: {
        date: 'desc',
      },
      include: {
        discussionTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async getOneUserDiscussion(discussionId: number): Promise<Discussion> {
    return this.databaseService.discussion.findUnique({
      where: { id: discussionId },
      include: {
        discussionFiles: true,
        user: {
          select: {
            username: true,
          },
        },
        discussionTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async getAllDiscussions(): Promise<Discussion[]> {
    return this.databaseService.discussion.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        discussionTags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async deleteUserDiscussion(discussionId: number): Promise<Discussion> {
    return this.databaseService.discussion.delete({
      where: { id: discussionId },
    });
  }

  async createUserDiscussion(
    dto: DiscussionDto,
    files: any,
  ): Promise<DiscussionAndFiles> {
    const _userId: string = dto.userId.toString();

    const discussion = await this.databaseService.discussion.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(),
        userId: parseInt(_userId),
      },
    });

    let filePaths: string[] = [];

    filePaths = await Promise.all(
      files.map(async (file: any) => {
        const fileName = await this.saveFile(file);

        await this.databaseService.discussionFiles.create({
          data: {
            discussionId: discussion.id,
            file: fileName,
            name: fileName,
          },
        });

        return fileName;
      }),
    );

    const _tags = dto.tags.split(',');

    if (dto.tags) {
      for (let i = 0; i < _tags.length; i++) {
        await this.discussionTagsService.createDiscussionTag(
          discussion.id,
          _tags[i],
        );
      }
    }

    return { discussion, discussionFiles: filePaths };
  }

  async updateUserDiscussion(
    discussionId: number,
    dto: DiscussionDto,
    files: any,
  ): Promise<DiscussionAndFiles> {
    const _userId: string = dto.userId.toString();

    const discussion = await this.databaseService.discussion.update({
      where: { id: discussionId },
      data: {
        title: dto.title,
        description: dto.description,
        userId: parseInt(_userId),
      },
    });

    let filePaths: string[] = [];

    filePaths = await Promise.all(
      files.map(async (file: any) => {
        const fileName = await this.saveFile(file);

        await this.databaseService.discussionFiles.create({
          data: {
            discussionId: discussion.id,
            file: fileName,
            name: fileName,
          },
        });

        return fileName;
      }),
    );

    const _tags = dto.tags.split(',');

    const currentDiscussionTags =
      await this.discussionTagsService.getDiscussionTags(discussionId);

    const currentTagIds = currentDiscussionTags.map((tag) => tag.tagId);

    await Promise.all(
      _tags.map(async (tag, index) => {
        if (
          !(await this.discussionTagsService.isDiscussionTagExist(
            discussionId,
            _tags[index],
          ))
        ) {
          const createdTag =
            await this.discussionTagsService.createDiscussionTag(
              discussionId,
              tag,
            );
          return createdTag.tagId;
        }
      }),
    );

    const tagsToDelete = currentTagIds.filter(
      (tagId) => !_tags.includes(tagId.toString()),
    );

    console.log(tagsToDelete);

    await Promise.all(
      tagsToDelete.map(async (tagId) => {
        const discussionTag = currentDiscussionTags.find(
          (tag) => tag.tagId === tagId,
        );
        if (discussionTag) {
          await this.discussionTagsService.deleteDiscussionTag(
            discussionTag.id,
          );
        }
      }),
    );

    return { discussion, discussionFiles: filePaths };
  }

  async searchDiscussions(searchTerm: string): Promise<Discussion[]> {
    if (searchTerm) {
      return this.databaseService.discussion.findMany({
        where: {
          title: { contains: searchTerm, mode: 'insensitive' },
        },
        include: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },
          discussionTags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      });
    }
  }

  async deleteDiscussionImage(
    discussionId: number,
    imageId: number,
  ): Promise<Discussion> {
    await this.databaseService.discussionFiles.delete({
      where: { id: imageId },
    });

    const updatedDiscussion = await this.getOneUserDiscussion(discussionId);

    return updatedDiscussion;
  }

  async saveFile(file: any): Promise<string> {
    const uploadDir = path.join(__dirname, '../../../src', '/uploads');

    try {
      await fs.access(uploadDir);
    } catch (error) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const fileName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, file.buffer);
    return fileName;
  }
}
