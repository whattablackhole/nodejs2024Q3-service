import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { Credentials, TokenCredentials } from 'src/models/dtos/auth';
import { UserDto } from 'src/models/dtos/user';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '../services/auth.service';
import { EntityNotFoundException } from 'src/exceptions/entity.exception';
import { ActionForbidden } from 'src/exceptions/auth.exception';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';

@Controller('/')
export class AuthController {
  constructor(
    private authService: AuthService,
    private dbClient: DatabaseClientService,
  ) {}
  @Post('/signup')
  async signup(@Body() credentials: Credentials): Promise<UserDto> {
    const user = await this.authService.signup(credentials);
    return plainToInstance(UserDto, user);
  }

  @Get('/refresh')
  async refreshTokens(): Promise<any> {
    return await this.dbClient.refreshToken.findMany();
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() credentials: Credentials,
  ): Promise<{ refreshToken: string; accessToken: string }> {
    try {
      return await this.authService.login(credentials);
    } catch (err) {
      console.log(err);
      if (
        err instanceof ActionForbidden ||
        err instanceof EntityNotFoundException
      ) {
        throw new ForbiddenException(err.message);
      }

      throw err;
    }
  }

  @Post('/refresh')
  @HttpCode(200)
  // TODO: make as in test... Refresh token must be jwt token...
  async refresh(
    @Body() data?: TokenCredentials,
  ): Promise<{ refreshToken: string; accessToken: string }> {
    try {
      const tokens = await this.authService.refresh(data.refreshToken);

      return tokens;
    } catch (err) {
      if (err instanceof ActionForbidden) {
        throw new ForbiddenException(err.message);
      }

      throw err;
    }
  }
}
