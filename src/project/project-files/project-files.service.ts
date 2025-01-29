import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { ProjectFiles } from '@prisma/client';

import * as fs from 'fs/promises';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectFilesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProjectFiles(projectId: number): Promise<ProjectFiles[]> {
    return this.databaseService.projectFiles.findMany({
      where: { projectId },
    });
  }

  async deleteProjectFile(fileId: number): Promise<ProjectFiles> {
    return this.databaseService.projectFiles.delete({
      where: { id: fileId },
    });
  }

  async createProjectFile(projectId: number, file: any): Promise<ProjectFiles> {
    const fileName = await this.saveFile(file[0]);

    return this.databaseService.projectFiles.create({
      data: {
        projectId: projectId,
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
