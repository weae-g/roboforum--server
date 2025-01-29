import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { ProjectComment, ProjectCommentFork } from '@prisma/client';
import { ProjectCommentDto } from '@project/dto';
import { UserCommentService } from '@user/user-comment/user-comment.service';

@Injectable()
export class ProjectCommentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userCommentService: UserCommentService,
  ) {}

  async getProjectComments(projectId: number): Promise<ProjectComment[]> {
    return this.databaseService.projectComment.findMany({
      where: { projectId },
      include: {
        userComment: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        projectCommentFork: {
          include: {
            userComment: {
              include: {
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async postUserProjectComment(
    projectId: number,
    dto: ProjectCommentDto,
  ): Promise<ProjectComment> {
    const userComment = await this.userCommentService.createUserComment(dto);

    if (userComment) {
      return this.databaseService.projectComment.create({
        data: {
          projectId,
          userCommentId: userComment.id,
        },
      });
    }
  }

  async postUserProjectCommentAnswer(
    projectId: number,
    dto: ProjectCommentDto,
  ): Promise<ProjectCommentFork> {
    const userComment = await this.userCommentService.createUserComment(dto);

    const userProjectComment =
      await this.databaseService.projectComment.findUnique({
        where: {
          userCommentId: dto.userCommentId,
        },
      });

    if (userComment && userProjectComment) {
      return this.databaseService.projectCommentFork.create({
        data: {
          projectCommentId: userProjectComment.id,
          userCommentId: userComment.id,
        },
        include: {
          userComment: true,
          projectComment: true,
        },
      });
    }
  }
}
