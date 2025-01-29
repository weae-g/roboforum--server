import {
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { DiscussionCommentService } from './discussion-comment.service';
import { DiscussionComment, DiscussionCommentFork } from '@prisma/client';
import { DiscussionCommentDto } from '@discussion/dto';
import { Public } from '@common/decorators';

@Controller('discussion/comment')
export class DiscussionCommentController {
  constructor(
    private readonly discussionCommentService: DiscussionCommentService,
  ) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':discussionId')
  async getDiscussionComments(
    @Param('discussionId', ParseIntPipe) discussionId: number,
  ): Promise<DiscussionComment[]> {
    return this.discussionCommentService.getDiscussionComments(discussionId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':discussionId')
  async postUserDiscussionComment(
    @Param('discussionId', ParseIntPipe) discussionId: number,
    @Body() dto: DiscussionCommentDto,
  ): Promise<DiscussionComment> {
    return this.discussionCommentService.postUserDiscussionComment(
      discussionId,
      dto,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('answer/:discussionId')
  async postUserDiscussionCommentAnswer(
    @Param('discussionId', ParseIntPipe) discussionId: number,
    @Body() dto: DiscussionCommentDto,
  ): Promise<DiscussionCommentFork> {
    return this.discussionCommentService.postUserDiscussionCommentAnswer(
      discussionId,
      dto,
    );
  }
}
