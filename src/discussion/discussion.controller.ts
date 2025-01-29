import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Param,
  Body,
  ParseIntPipe,
  ClassSerializerInterceptor,
  Delete,
  Put,
} from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionDto } from './dto/discussion.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Discussion } from '@prisma/client';
import { Public } from '@common/decorators';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserDiscussions(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Discussion[]> {
    const discussions = await this.discussionService.getUserDiscussions(userId);
    return discussions;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('one/:discussionId')
  async getOneUserDiscussion(
    @Param('discussionId', ParseIntPipe) discussionId: number,
  ): Promise<Discussion> {
    return this.discussionService.getOneUserDiscussion(discussionId);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getAllDiscussions(): Promise<Discussion[]> {
    const discussions = await this.discussionService.getAllDiscussions();
    return discussions;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseInterceptors(FilesInterceptor('discussionFiles'))
  async createDiscussion(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() discussionDto: DiscussionDto,
  ) {
    const discussionAndFiles =
      await this.discussionService.createUserDiscussion(discussionDto, files);
    return discussionAndFiles;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':discussionId')
  @UseInterceptors(FilesInterceptor('discussionFiles'))
  async updateDiscussion(
    @Param('discussionId', ParseIntPipe) discussionId: number,
    @UploadedFiles() files?: Array<Express.Multer.File>,
    @Body() discussionDto?: DiscussionDto,
  ) {
    const discussionAndFiles =
      await this.discussionService.updateUserDiscussion(
        discussionId,
        discussionDto,
        files,
      );
    return discussionAndFiles;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':discussionId/:imageId')
  async deleteDiscussionImage(
    @Param('discussionId', ParseIntPipe) discussionId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ): Promise<Discussion> {
    const discussion = await this.discussionService.deleteDiscussionImage(
      discussionId,
      imageId,
    );
    return discussion;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':discussionId')
  async deleteUserDiscussion(
    @Param('discussionId', ParseIntPipe) discussionId: number,
  ): Promise<Discussion> {
    const discussion =
      await this.discussionService.deleteUserDiscussion(discussionId);
    return discussion;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/search/:searchTerm')
  async searchDiscussions(
    @Param('searchTerm') searchTerm: string,
  ): Promise<Discussion[]> {
    const discussions =
      await this.discussionService.searchDiscussions(searchTerm);
    return discussions;
  }
}
