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
import { ArtistService } from '../services/artist.service';
import {
  ArtistDto,
  CreateArtistDto,
  UpdateArtistDto,
} from 'src/models/dtos/artist';
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

@ApiTags('artist')
@Controller('/')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: 'Retrieve all artist records' })
  @ApiResponse({
    status: 200,
    description: 'Artists have been successfully retrieved',
    type: ArtistDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  async findAll(): Promise<ArtistDto[]> {
    return await this.artistService.artists();
  }
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully retrieved',
    type: ArtistDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Retrieve artist record by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist id has to be in UUID format',
  })
  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<ArtistDto> {
    try {
      return await this.artistService.artist({ id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully deleted',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Delete artist record by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist id has to be in UUID format',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @Delete(':id')
  @HttpCode(204)
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ): Promise<void> {
    try {
      return await this.artistService.deleteArtist({ id });
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw new HttpException(err.message, 404);
      }
      throw new ServerErrorException();
    }
  }

  @Post()
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created',
    type: ArtistDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiOperation({ summary: 'Create new artist record' })
  @ApiBody({ type: CreateArtistDto })
  async createOne(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistDto> {
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
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully updated',
    type: ArtistDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist id has to be in UUID format',
  })
  @ApiOperation({ summary: 'Update artist record information by id' })
  @ApiBody({ type: UpdateArtistDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateArtistDto,
  ): Promise<ArtistDto> {
    try {
      return await this.artistService.updateArtist({
        data: updateUserDto,
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
