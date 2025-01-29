import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { ProjectAndFiles, ProjectDto } from './dto/project.dto';

import * as fs from 'fs/promises';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';
import { ProjectTagsService } from './project-tags/project-tags.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly projectTagsService: ProjectTagsService,
  ) {}

  async getUserProjects(userId: number): Promise<Project[]> {
    return this.databaseService.project.findMany({
      where: { userId },
      orderBy: {
        date: 'desc',
      },
      include: {
        projectTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async getOneUserProject(projectId: number): Promise<Project> {
    return this.databaseService.project.findUnique({
      where: { id: projectId },
      include: {
        projectFiles: true,
        user: {
          select: {
            username: true,
          },
        },
        projectTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return this.databaseService.project.findMany({
      where: {
        projectTypeId: 1,
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        projectTags: {
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

  async getPublicProjects(): Promise<Project[]> {
    return this.databaseService.project.findMany({
      where: {
        projectTypeId: 1,
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        projectTags: {
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

  async deleteUserProject(projectId: number): Promise<Project> {
    return this.databaseService.project.delete({
      where: { id: projectId },
    });
  }

  async createUserProject(
    dto: ProjectDto,
    files: any,
  ): Promise<ProjectAndFiles> {
    const _userId: string = dto.userId.toString();
    const _projectTypeId: string = dto.projectTypeId.toString();

    const project = await this.databaseService.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(),
        userId: parseInt(_userId),
        projectTypeId: parseInt(_projectTypeId),
      },
    });

    let filePaths: string[] = [];

    filePaths = await Promise.all(
      files.map(async (file: any) => {
        const fileName = await this.saveFile(file);

        await this.databaseService.projectFiles.create({
          data: {
            projectId: project.id,
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
        await this.projectTagsService.createProjectTag(project.id, _tags[i]);
      }
    }

    return { project, projectFiles: filePaths };
  }

  async updateUserProject(
    projectId: number,
    dto: ProjectDto,
    files: any,
  ): Promise<ProjectAndFiles> {
    const _userId: string = dto.userId.toString();
    const _projectTypeId: string = dto.projectTypeId.toString();

    const project = await this.databaseService.project.update({
      where: { id: projectId },
      data: {
        title: dto.title,
        description: dto.description,
        userId: parseInt(_userId),
        projectTypeId: parseInt(_projectTypeId),
      },
    });

    let filePaths: string[] = [];

    filePaths = await Promise.all(
      files.map(async (file: any) => {
        const fileName = await this.saveFile(file);

        await this.databaseService.projectFiles.create({
          data: {
            projectId: project.id,
            file: fileName,
            name: fileName,
          },
        });

        return fileName;
      }),
    );

    const _tags = dto.tags.split(',');

    const currentProjectTags =
      await this.projectTagsService.getProjectTags(projectId);

    const currentTagIds = currentProjectTags.map((tag) => tag.tagId);

    await Promise.all(
      _tags.map(async (tag, index) => {
        if (
          !(await this.projectTagsService.isProjectTagExist(
            projectId,
            _tags[index],
          ))
        ) {
          const createdTag = await this.projectTagsService.createProjectTag(
            projectId,
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
        const projectTag = currentProjectTags.find(
          (tag) => tag.tagId === tagId,
        );
        if (projectTag) {
          await this.projectTagsService.deleteProjectTag(projectTag.id);
        }
      }),
    );

    return { project, projectFiles: filePaths };
  }

  async searchProjects(searchTerm: string): Promise<Project[]> {
    if (searchTerm) {
      return this.databaseService.project.findMany({
        where: {
          title: { contains: searchTerm, mode: 'insensitive' },
          projectTypeId: 1,
        },
        include: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },
          projectTags: {
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
    return this.getPublicProjects();
  }

  async deleteProjectImage(
    projectId: number,
    imageId: number,
  ): Promise<Project> {
    await this.databaseService.projectFiles.delete({
      where: { id: imageId },
    });

    const updatedProject = await this.getOneUserProject(projectId);

    return updatedProject;
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
