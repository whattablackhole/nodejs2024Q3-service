import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class FavoritesController {
  @Get()
  findAll(): string {
    return 'This action returns all favorites';
  }
}
