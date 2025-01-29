import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  username: string;
}
