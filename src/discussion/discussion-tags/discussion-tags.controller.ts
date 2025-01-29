import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { DiscussionTagsService } from './discussion-tags.service';
import { DiscussionTagsDto } from './dto';
import { DiscussionTags } from '@prisma/client';

@Controller('discussion/tags')
export class DiscussionTagsController {
  constructor(private readonly discussionTagsService: DiscussionTagsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async postTagToDiscussion(
    @Body() dto: DiscussionTagsDto,
  ): Promise<DiscussionTags> {
    return this.discussionTagsService.createDiscussionTag(
      dto.discussionId,
      dto.tagId,
    );
  }
}
