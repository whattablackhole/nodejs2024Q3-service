import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/models/dtos/user';
import { UserService } from '../services/user.service';
import { plainToInstance } from 'class-transformer';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.users();
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<UserDto> {
    const user = await this.userService.user(id);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Post()
  async createOne(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.createUser(createUserDto);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.userService.updateUser({ data: updateUserDto, id });
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }
}
