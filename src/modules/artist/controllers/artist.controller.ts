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
import { Artist } from 'src/types/artist';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto, UpdateArtistDto } from 'src/models/dtos/artist';

@Controller('/')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistService.artists();
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<Artist> {
    return await this.artistService.artist(id);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.artistService.deleteArtist(id);
  }

  @Post()
  async createOne(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.updateArtist({ data: updateUserDto, id });
  }
}
