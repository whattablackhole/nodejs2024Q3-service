import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class TrackController {
  @Get()
  findAll(): string {
    return 'This action returns all tracks';
  }
}
