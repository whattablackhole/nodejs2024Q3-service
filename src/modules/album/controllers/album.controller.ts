import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AlbumController {
  @Get()
  findAll(): string {
    return 'This action returns all albums';
  }
}
