import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { DiscussionFiles } from '@prisma/client';

import * as fs from 'fs/promises';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DiscussionFilesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getDiscussionFiles(discussionId: number): Promise<DiscussionFiles[]> {
    return this.databaseService.discussionFiles.findMany({
      where: { discussionId },
    });
  }

  async deleteDiscussionFile(fileId: number): Promise<DiscussionFiles> {
    return this.databaseService.discussionFiles.delete({
      where: { id: fileId },
    });
  }

  async createDiscussionFile(
    discussionId: number,
    file: any,
  ): Promise<DiscussionFiles> {
    const fileName = await this.saveFile(file[0]);

    return this.databaseService.discussionFiles.create({
      data: {
        discussionId: discussionId,
        file: fileName,
        name: fileName,
      },
    });
  }

  async saveFile(file: any): Promise<string> {
    const uploadDir = path.join(__dirname, '../uploads');
    // const uploadDir = path.join(__dirname, '../../../src', /uploads');

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
