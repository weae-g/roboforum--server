import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { UserCommentDto } from '@user/dto';

@Injectable()
export class UserCommentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUserComment(dto: UserCommentDto) {
    return this.databaseService.userComment.create({
      data: {
        userId: dto.userId,
        comment: dto.comment,
        dateTime: new Date(),
      },
    });
  }

  async findCommentByUserId(userId: number) {
    return this.databaseService.userComment.findMany({
      where: {
        userId,
      },
    });
  }

  async findCommentById(commentId: number) {
    return this.databaseService.userComment.findUnique({
      where: {
        id: commentId,
      },
    });
  }
}
