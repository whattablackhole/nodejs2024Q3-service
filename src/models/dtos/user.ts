import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/types/user';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The login of the user, must be 3-255 characters long',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  login: string;

  @ApiProperty({
    description:
      'The password, must be alphanumeric + underscores and 3-30 characters long',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message:
      'Password must contain only alphanumeric characters and underscores and be between 3 and 30 characters long',
  })
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message:
      'Password must contain only alphanumeric characters and underscores and be between 3 and 30 characters long',
  })
  @ApiProperty({
    description: 'The current password of the user',
    example: 'Strong_password',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message:
      'Password must contain only alphanumeric characters and underscores and be between 3 and 30 characters long',
  })
  @ApiProperty({
    description:
      'The new password, must be alphanumeric + underscores and 3-30 characters long',
    example: 'New_Strong_password',
  })
  newPassword: string;
}

export class UserDto implements User {
  @Expose()
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '23c205ce-f1e9-4bae-9e6a-c913fe15a29a',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description:
      'Timestamp when the user was created, in milliseconds since epoch',
    example: 1729182335190,
  })
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The login name of the user',
    example: 'Pupkin',
  })
  login: string;

  @Expose()
  @ApiProperty({
    description:
      'Timestamp when the user was last updated, in milliseconds since epoch',
    example: 1729182335190,
  })
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description:
      'The current version of the user record, incremented on updates',
    example: 1,
  })
  version: number;

  @Exclude()
  @ApiHideProperty()
  @ApiProperty({
    description: "The user's password (excluded from response)",
    example: 'Strong_password',
  })
  password: string;
}
