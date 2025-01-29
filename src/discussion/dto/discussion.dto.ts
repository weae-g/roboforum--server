import { Discussion } from '@prisma/client';
import { UserCommentDto } from '@user/dto';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class DiscussionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date?: any;

  @IsNumber()
  userId: number;

  tags?: any;

  discussionFiles: Array<any>;
}

export interface DiscussionAndFiles {
  discussion: Discussion;
  discussionFiles?: string[];
}

export class DiscussionSearchDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: any;

  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class DiscussionCommentDto extends UserCommentDto {
  @IsNumber()
  userCommentId?: number;

  @IsNumber()
  discussionId?: number;
}
