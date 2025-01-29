import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagDto } from './dto';

@Injectable()
export class TagService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTags(): Promise<Tag[]> {
    return this.databaseService.tag.findMany();
  }

  async getOneTagById(tagId: number): Promise<Tag | null> {
    return this.databaseService.tag.findUnique({
      where: { id: tagId },
    });
  }

  async createTag(dto: TagDto): Promise<Tag> {
    return this.databaseService.tag.create({
      data: dto,
    });
  }

  async updateTag(tagId: number, dto: TagDto): Promise<Tag> {
    return this.databaseService.tag.update({
      where: { id: tagId },
      data: dto,
    });
  }

  async deleteTag(tagId: number): Promise<Tag | null> {
    return this.databaseService.tag.delete({
      where: { id: tagId },
    });
  }
}
