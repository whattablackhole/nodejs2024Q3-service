import { Module } from '@nestjs/common';
import { FavoritesController } from './controllers/favorites.controller';
import { FavoritesService } from './services/favorites.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
