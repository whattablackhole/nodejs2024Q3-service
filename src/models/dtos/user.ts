import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/types/user';
import { Exclude } from 'class-transformer';

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


export class UserDto implements User {
  id: string;
  createdAt: number;
  login: string;
  updatedAt: number;
  version: number;
  @Exclude()
  password: string;
}
