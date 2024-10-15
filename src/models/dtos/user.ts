import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5)
  login: string;

  @MinLength(5)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @MinLength(5)
  newPassword: string;
}
