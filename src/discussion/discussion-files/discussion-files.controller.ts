import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DiscussionFilesService } from './discussion-files.service';
import { DiscussionFiles } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('discussion/files')
export class DiscussionFilesController {
  constructor(
    private readonly discussionFilesService: DiscussionFilesService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':discussionId')
  async getDiscussionFiles(
    @Param('discussionId', ParseIntPipe) discussionId: number,
  ): Promise<DiscussionFiles[]> {
    return this.discussionFilesService.getDiscussionFiles(discussionId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':fileId')
  async deleteDiscussionFile(
    @Param('fileId', ParseIntPipe) fileId: number,
  ): Promise<DiscussionFiles> {
    return this.discussionFilesService.deleteDiscussionFile(fileId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FilesInterceptor('file'))
  @Post(':discussionId')
  async createDiscussionFile(
    @Param('discussionId', ParseIntPipe) discussionId: number,
    @UploadedFiles() file: Express.Multer.File,
  ): Promise<DiscussionFiles> {
    return this.discussionFilesService.createDiscussionFile(discussionId, file);
  }
}
