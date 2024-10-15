import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesResponse } from 'src/models/dtos/favorites';

@Controller('/')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @Get('/')
  async getFavs(): Promise<FavoritesResponse> {
    return await this.favoritesService.favorites();
  }

  @Post('track/:id')
  async addFavTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<string> {
    return await this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  async addFavAlbum(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<string> {
    return await this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  async addFavArtist(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<string> {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  async deleteFavTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  async deleteFavAlbum(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  async deleteFavArtist(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteArtist(id);
  }
}
