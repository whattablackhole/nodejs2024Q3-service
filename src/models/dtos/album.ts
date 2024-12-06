import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Album } from 'src/types/album';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the album', example: 'Abbey Road' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false })
  @Min(1900)
  @Max(2100)
  @ApiProperty({
    description: 'The year the album was released',
    example: 1969,
    minimum: 1900,
    maximum: 2100,
  })
  year: number;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'The UUID of the artist associated with the album, if any',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}

export class AlbumDto implements Album {
  @ApiProperty({
    description: 'The unique identifier for the album',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'The name of the album', example: 'Abbey Road' })
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    example: 1969,
    minimum: 1900,
    maximum: 2100,
  })
  year: number;

  @ApiProperty({
    description: 'The UUID of the artist associated with the album',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  artistId: string;
}
