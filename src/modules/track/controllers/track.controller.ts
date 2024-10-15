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
import { TrackService } from '../services/track.service';
import { Track } from 'src/types/track';
import { CreateTrackDto, UpdateTrackDto } from 'src/models/dtos/track';

@Controller('/')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.tracks();
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<Track> {
    return await this.trackService.track(id);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    return await this.trackService.deleteTrack(id);
  }

  @Post()
  async createOne(@Body() createUserDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(createUserDto);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.trackService.updateTrack({ data: updateUserDto, id });
  }
}
