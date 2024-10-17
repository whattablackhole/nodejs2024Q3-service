import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/types/user';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class UserDto implements User {
  @Expose()
  id: string;
  @Expose()
  createdAt: number;
  @Expose()
  login: string;
  @Expose()
  updatedAt: number;
  @Expose()
  version: number;
  @Exclude()
  password: string;
}
