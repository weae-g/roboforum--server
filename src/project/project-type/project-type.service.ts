import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Project, ProjectType } from '@prisma/client';

@Injectable()
export class ProjectTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProjectType(projectId: number): Promise<ProjectType> {
    const project = await this.databaseService.project.findUnique({
      where: { id: projectId },
    });

    return this.databaseService.projectType.findUnique({
      where: { id: project.projectTypeId },
    });
  }

  async updateProjectType(
    projectId: number,
    projectTypeId: number,
  ): Promise<Project> {
    return this.databaseService.project.update({
      where: { id: projectId },
      data: {
        projectTypeId: projectTypeId,
      },
    });
  }
}
