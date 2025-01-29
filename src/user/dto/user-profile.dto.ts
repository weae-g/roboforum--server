import { IsNumber, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  bio: string;

  @IsString()
  company: string;

  @IsString()
  location: string;

  links: any;

  image: any;
}
