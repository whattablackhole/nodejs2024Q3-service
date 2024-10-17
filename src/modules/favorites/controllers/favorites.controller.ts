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
import { FavoritesResponseDto } from 'src/models/dtos/favorites';
import {
  EntityNotFoundException,
  ServerErrorException,
  UnprocessableEntity,
} from 'src/modules/common/exceptions/entity.exception';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('/')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiResponse({
    status: 200,
    description: 'The collection has been successfuly retrieved',
    type: FavoritesResponseDto,
  })
  @ApiOperation({
    summary: 'Retrive collection of favorite artists, albums and tracks',
  })
  @Get()
  async getFavs(): Promise<FavoritesResponseDto> {
    try {
      return await this.favoritesService.favorites();
    } catch {
      throw new ServerErrorException();
    }
  }

  @ApiResponse({ status: 422, description: 'The track is not processable' })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully added from favorites',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Add track to favorites by id' })
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

  @ApiResponse({ status: 422, description: 'The album is not processable' })
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully added from favorites',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Add album to favorites by id' })
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

  @ApiResponse({ status: 422, description: 'The artist is not processable' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully added from favorites',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Add artist to favorites by id' })
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

  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully removed from favorites',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Remove track from favorites by id' })
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

  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully removed from favorites',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Remove album from favorites by id' })
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

  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully removed from favorites',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiOperation({ summary: 'Remove artist from favorites by id' })
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
