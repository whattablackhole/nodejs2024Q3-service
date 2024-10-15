import { Module } from '@nestjs/common';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './services/album.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
