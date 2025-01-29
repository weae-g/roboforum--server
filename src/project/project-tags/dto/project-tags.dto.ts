import { IsNumber, IsString } from 'class-validator';

export class ProjectTagsDto {
  @IsNumber()
  projectId?: number;

  @IsNumber()
  tagId?: number;

  @IsString()
  name?: string;
}
