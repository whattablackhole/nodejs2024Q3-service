import { ApiProperty } from '@nestjs/swagger';
import { ArtistDto } from './artist';
import { TrackDto } from './track';
import { AlbumDto } from './album';
import { Favorites } from 'src/types/favorites';

export class FavoritesResponseDto implements Favorites {
  @ApiProperty({
    description: 'A list of favorite artists',
    type: ArtistDto,
    isArray: true,
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Adele',
        grammy: true,
      },
    ],
  })
  artists: ArtistDto[];

  @ApiProperty({
    description: 'A list of favorite albums',
    type: AlbumDto,
    isArray: true,
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Abbey Road',
        year: 1969,
        artistId: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
  })
  albums: AlbumDto[];

  @ApiProperty({
    description: 'A list of favorite tracks',
    type: TrackDto,
    isArray: true,
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Imagine',
        duration: 183,
        artistId: '123e4567-e89b-12d3-a456-426614174000',
        albumId: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
  })
  tracks: TrackDto[];
}
