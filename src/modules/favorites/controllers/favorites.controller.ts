import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesResponse } from 'src/models/dtos/favorites';
import {
  EntityNotFoundException,
  ServerErrorException,
  UnprocessableEntity,
} from 'src/modules/common/exceptions/entity.exception';

@Controller('/')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @Get()
  async getFavs(): Promise<FavoritesResponse> {
    try {
      return await this.favoritesService.favorites();
    } catch {
      throw new ServerErrorException();
    }
  }

  @Post('track/:id')
  async addFavTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<{ message: string }> {
    try {
      await this.favoritesService.addTrack(id);
      return { message: 'Track was added to favorites successfuly' };
    } catch (err) {
      if (err instanceof UnprocessableEntity) {
        throw new HttpException(err.message, 422);
      }
      throw new ServerErrorException();
    }
  }

  @Post('album/:id')
  async addFavAlbum(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<{ message: string }> {
    try {
      await this.favoritesService.addAlbum(id);
      return { message: 'Album was added to favorites successfuly' };
    } catch (err) {
      if (err instanceof UnprocessableEntity) {
        throw new HttpException(err.message, 422);
      }
      throw new ServerErrorException();
    }
  }

  @Post('artist/:id')
  async addFavArtist(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<{ message: string }> {
    try {
      await this.favoritesService.addArtist(id);
      return { message: 'Artist was added to favorites successfuly' };
    } catch (err) {
      if (err instanceof UnprocessableEntity) {
        throw new HttpException(err.message, 422);
      }
      throw new ServerErrorException();
    }
  }
  @HttpCode(204)
  @Delete('track/:id')
  async deleteFavTrack(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.favoritesService.deleteTrack(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
  @HttpCode(204)
  @Delete('album/:id')
  async deleteFavAlbum(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.favoritesService.deleteAlbum(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
  @HttpCode(204)
  @Delete('artist/:id')
  async deleteFavArtist(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.favoritesService.deleteArtist(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
}
