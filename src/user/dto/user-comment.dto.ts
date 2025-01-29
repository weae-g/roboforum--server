import { IsNumber, IsString } from 'class-validator';

export class UserCommentDto {
  @IsNumber()
  userId: number;

  @IsString()
  comment: string;

  @IsString()
  dateTime?: string;
}
