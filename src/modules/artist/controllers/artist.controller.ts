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
import { Artist } from 'src/types/artist';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto, UpdateArtistDto } from 'src/models/dtos/artist';
import {
  EntityNotFoundException,
  ServerErrorException,
} from 'src/modules/common/exceptions/entity.exception';

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
    try {
      return await this.artistService.artist(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.artistService.deleteArtist(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Post()
  async createOne(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    try {
      return await this.artistService.createArtist(createArtistDto);
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
    @Body() updateUserDto: UpdateArtistDto,
  ): Promise<Artist> {
    try {
      return await this.artistService.updateArtist({ data: updateUserDto, id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
}
