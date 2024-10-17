import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/models/dtos/user';
import { UserService } from '../services/user.service';
import { plainToInstance } from 'class-transformer';
import { PasswordMismatchException } from '../exceptions/user.exception';
import {
  EntityNotFoundException,
  ServerErrorException,
} from 'src/modules/common/exceptions/entity.exception';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userService.users();
      return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
    } catch {
      throw new ServerErrorException();
    }
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.user(id);
      return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.userService.deleteUser(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Post()
  async createOne(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.updateUser({
        data: updateUserDto,
        id,
      });
      return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    } catch (err) {
      if (err instanceof PasswordMismatchException) {
        throw new HttpException(err.message, 403);
      }
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
}
