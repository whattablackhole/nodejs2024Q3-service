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
import { TrackService } from '../services/track.service';
import { Track } from 'src/types/track';
import { CreateTrackDto, UpdateTrackDto } from 'src/models/dtos/track';
import {
  EntityNotFoundException,
  ServerErrorException,
} from 'src/modules/common/exceptions/entity.exception';

@Controller('/')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    try {
      return await this.trackService.tracks();
    } catch {
      throw new ServerErrorException();
    }
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<Track> {
    try {
      return await this.trackService.track(id);
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
      return await this.trackService.deleteTrack(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Post()
  async createOne(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await this.trackService.createTrack(createTrackDto);
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
    @Body() updateUserDto: UpdateTrackDto,
  ): Promise<Track> {
    try {
      return await this.trackService.updateTrack({ data: updateUserDto, id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
}
