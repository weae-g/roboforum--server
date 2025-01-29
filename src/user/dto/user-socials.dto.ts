import { IsNumber, IsString } from 'class-validator';

export class UserSocialsDto {
  @IsString()
  link: string;

  @IsString()
  resource: string;

  @IsNumber()
  userProfileId: number;
}

export class CreateUserSocialsDto {
  @IsString()
  link: string;

  @IsString()
  resource: string;
}
