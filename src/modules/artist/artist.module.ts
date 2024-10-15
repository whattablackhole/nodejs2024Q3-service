import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
