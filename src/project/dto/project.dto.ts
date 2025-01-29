import { Project } from '@prisma/client';
import { UserCommentDto } from '@user/dto';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date?: any;

  @IsNumber()
  userId: number;

  @IsNumber()
  projectTypeId: number;

  tags?: any;

  projectFiles: Array<any>;
}

export interface ProjectAndFiles {
  project: Project;
  projectFiles?: string[];
}

export class ProjectSearchDto {
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

  @IsOptional()
  @IsNumber()
  projectTypeId?: number;
}

export class ProjectCommentDto extends UserCommentDto {
  @IsNumber()
  userCommentId?: number;

  @IsNumber()
  projectId?: number;
}
