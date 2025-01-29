import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  // @IsString()
  // @MinLength(6)
  // @Validate(IsPasswordMatchingConstraint)
  // passwordRepeat: string;

  @IsNumber()
  roleId: number;
}
