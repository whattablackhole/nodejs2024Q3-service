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
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import {
  AlbumDto,
  CreateAlbumDto,
  UpdateAlbumDto,
} from 'src/models/dtos/album';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServerErrorException } from 'src/modules/common/exceptions/server.exception';
import { JwtAuthGuard } from 'src/modules/jwt/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('album')
@Controller('/')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiResponse({
    status: 200,
    description: 'Albums have been successfully retrieved',
    type: AlbumDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Get all albums' })
  @Get()
  async findAll(): Promise<AlbumDto[]> {
    try {
      return await this.albumService.albums();
    } catch {
      throw new ServerErrorException();
    }
  }

  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({
    status: 200,
    description: 'The Album has been successfully retrieved',
    type: AlbumDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Get album by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<AlbumDto> {
    try {
      return await this.albumService.album({ id });
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
    description: 'The Album has been successfully deleted',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Delete album by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @HttpCode(204)
  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.albumService.deleteAlbum({ id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Create new album record' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({
    status: 201,
    description: 'The Album has been successfully created',
    type: AlbumDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiBody({ type: CreateAlbumDto })
  @Post()
  async createOne(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumDto> {
    try {
      return await this.albumService.createAlbum(createAlbumDto);
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update new album record by id' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({
    status: 200,
    description: 'The Album has been successfully updated',
    type: AlbumDto,
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
  @ApiBody({ type: UpdateAlbumDto })
  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumDto> {
    try {
      return await this.albumService.updateAlbum({
        data: updateAlbumDto,
        where: { id },
      });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }
}
