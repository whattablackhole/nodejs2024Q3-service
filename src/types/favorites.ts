import { Album } from './album';
import { Artist } from './artist';
import { Track } from './track';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
