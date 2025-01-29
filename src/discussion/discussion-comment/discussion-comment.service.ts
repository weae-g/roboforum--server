import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { DiscussionComment, DiscussionCommentFork } from '@prisma/client';
import { DiscussionCommentDto } from '@discussion/dto';
import { UserCommentService } from '@user/user-comment/user-comment.service';

@Injectable()
export class DiscussionCommentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userCommentService: UserCommentService,
  ) {}

  async getDiscussionComments(
    discussionId: number,
  ): Promise<DiscussionComment[]> {
    return this.databaseService.discussionComment.findMany({
      where: { discussionId },
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
        discussionCommentFork: {
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

  async postUserDiscussionComment(
    discussionId: number,
    dto: DiscussionCommentDto,
  ): Promise<DiscussionComment> {
    const userComment = await this.userCommentService.createUserComment(dto);

    if (userComment) {
      return this.databaseService.discussionComment.create({
        data: {
          discussionId,
          userCommentId: userComment.id,
        },
      });
    }
  }

  async postUserDiscussionCommentAnswer(
    discussionId: number,
    dto: DiscussionCommentDto,
  ): Promise<DiscussionCommentFork> {
    const userComment = await this.userCommentService.createUserComment(dto);

    const userDiscussionComment =
      await this.databaseService.discussionComment.findUnique({
        where: {
          userCommentId: dto.userCommentId,
        },
      });

    if (userComment && userDiscussionComment) {
      return this.databaseService.discussionCommentFork.create({
        data: {
          discussionCommentId: userDiscussionComment.id,
          userCommentId: userComment.id,
        },
        include: {
          userComment: true,
          discussionComment: true,
        },
      });
    }
  }
}
