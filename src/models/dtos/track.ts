import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Track } from 'src/types/track';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The current name of the track',
    example: 'Track 1',
  })
  name: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'The current artist id of the track of type UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'The current album id of the track of type UUID',
    example: '223e4567-e89b-12d3-a456-426614174001',
    nullable: true,
  })
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The duration of the track in seconds',
    example: 240,
  })
  duration: number;
}

export class UpdateTrackDto extends CreateTrackDto {}

export class TrackDto implements Track {
  @ApiProperty({
    description: 'The unique identifier for the track',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'The name of the track', example: 'Track 1' })
  name: string;

  @ApiProperty({
    description: 'The artist id associated with the track',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  artistId: string;

  @ApiProperty({
    description: 'The album id associated with the track',
    example: '223e4567-e89b-12d3-a456-426614174001',
  })
  albumId: string;

  @ApiProperty({
    description: 'The duration of the track in seconds',
    example: 240,
  })
  duration: number;
}
