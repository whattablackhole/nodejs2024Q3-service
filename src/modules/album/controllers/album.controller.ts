import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/models/dtos/album';
import { Album } from 'src/types/album';

@Controller('/')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumService.albums();
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<Album> {
    return await this.albumService.album(id);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.albumService.deleteAlbum(id);
  }

  @Post()
  async createOne(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.updateAlbum({ data: updateAlbumDto, id });
  }
}
