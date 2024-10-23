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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/models/dtos/user';
import { UserService } from '../services/user.service';
import { plainToInstance } from 'class-transformer';
import { PasswordMismatchException } from '../exceptions/user.exception';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServerErrorException } from 'src/modules/common/exceptions/server.exception';
import { JwtAuthGuard } from 'src/modules/jwt/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOkResponse({
    description: 'The users have been successfully retrieved.',
    type: UserDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userService.users();
      return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
    } catch {
      throw new ServerErrorException();
    }
  }

  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String, description: 'id has UUID format' })
  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.user({ id });
      return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', type: String, description: 'User id in UUID format' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @HttpCode(204)
  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.userService.deleteUser({ id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
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
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Password mismatch' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam({ name: 'id', type: String, description: 'id has UUID format' })
  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.updateUser({
        data: updateUserDto,
        where: { id },
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
