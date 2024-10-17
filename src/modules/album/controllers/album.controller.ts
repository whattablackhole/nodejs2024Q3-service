import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/models/dtos/album';
import { Album } from 'src/types/album';
import {
  EntityNotFoundException,
  ServerErrorException,
} from 'src/modules/common/exceptions/entity.exception';

@Controller('/')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    try {
      return await this.albumService.albums();
    } catch {
      throw new ServerErrorException();
    }
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<Album> {
    try {
      return await this.albumService.album(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.albumService.deleteAlbum(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Post()
  async createOne(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      return await this.albumService.createAlbum(createAlbumDto);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    try {
      return await this.albumService.updateAlbum({ data: updateAlbumDto, id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
}
