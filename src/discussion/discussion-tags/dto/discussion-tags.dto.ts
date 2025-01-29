import { IsNumber, IsString } from 'class-validator';

export class DiscussionTagsDto {
  @IsNumber()
  discussionId?: number;

  @IsNumber()
  tagId?: number;

  @IsString()
  name?: string;
}
