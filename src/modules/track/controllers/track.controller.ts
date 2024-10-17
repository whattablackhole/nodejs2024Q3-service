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
import {
  CreateTrackDto,
  TrackDto,
  UpdateTrackDto,
} from 'src/models/dtos/track';
import {
  EntityNotFoundException,
  ServerErrorException,
} from 'src/modules/common/exceptions/entity.exception';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('track')
@Controller('/')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @ApiResponse({
    status: 200,
    description: 'Tracks have been successfully retrieved',
    type: TrackDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Retrive all tracks' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  async findAll(): Promise<TrackDto[]> {
    try {
      return await this.trackService.tracks();
    } catch {
      throw new ServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Retrive track by id' })
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully retrieved',
    type: TrackDto,
  })
  @ApiResponse({ status: 404, description: 'Track not found' })
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
  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<TrackDto> {
    try {
      return await this.trackService.track(id);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete the track record by id' })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Track not found' })
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
  @ApiOperation({ summary: 'Create new track record' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully created',
    type: TrackDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Post()
  async createOne(@Body() createTrackDto: CreateTrackDto): Promise<TrackDto> {
    try {
      return await this.trackService.createTrack(createTrackDto);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update track information by id' })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({
    status: 200,
    type: TrackDto,
    description: 'The track has been successfully updated',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track id has to be in UUID format',
  })
  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateTrackDto,
  ): Promise<TrackDto> {
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
