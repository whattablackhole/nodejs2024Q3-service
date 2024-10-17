import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Track } from 'src/types/track';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
