import { IsNotEmpty, IsString } from 'class-validator';

export class Credentials {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TokenCredentials {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
