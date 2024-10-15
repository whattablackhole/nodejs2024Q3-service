import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class UserController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
