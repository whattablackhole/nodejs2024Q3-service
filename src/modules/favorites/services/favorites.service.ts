import { Injectable } from '@nestjs/common';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import {
  EntityNotFoundException,
  UnprocessableEntity,
} from 'src/modules/common/exceptions/entity.exception';
import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Track } from 'src/types/track';
import { Favorites } from 'src/types/favorites';

@Injectable()
export class FavoritesService {
  constructor(private dbClient: DatabaseClientService) {}

  async favorites(): Promise<Favorites> {
    const response = {
      tracks: this.dbClient
        .getAll(`favorites:track`)
        .map((id) => this.dbClient.get(`track:${id}`)) as Track[],
      albums: this.dbClient
        .getAll(`favorites:album`)
        .map((id) => this.dbClient.get(`album:${id}`)) as Album[],
      artists: this.dbClient
        .getAll(`favorites:artist`)
        .map((id) => this.dbClient.get(`artist:${id}`)) as Artist[],
    };
    return Promise.resolve(response);
  }

  async addTrack(id: string): Promise<void> {
    if (!this.dbClient.get(`track:${id}`)) {
      throw new UnprocessableEntity('Provided entity data is not processable');
    }

    this.dbClient.add(`favorites:track:${id}`, id);

    return Promise.resolve();
  }

  async addAlbum(id: string): Promise<void> {
    if (!this.dbClient.get(`album:${id}`)) {
      throw new UnprocessableEntity('Provided entity data is not processable');
    }

    this.dbClient.add(`favorites:album:${id}`, id);

    return Promise.resolve();
  }

  async addArtist(id: string): Promise<void> {
    if (!this.dbClient.get(`artist:${id}`)) {
      throw new UnprocessableEntity('Provided entity data is not processable');
    }

    this.dbClient.add(`favorites:artist:${id}`, id);

    return Promise.resolve();
  }
  async deleteArtist(id: string): Promise<void> {
    if (!this.dbClient.get(`favorites:artist:${id}`)) {
      throw new EntityNotFoundException('Favorite artist');
    }

    this.dbClient.delete(`favorites:artist:${id}`);

    return Promise.resolve();
  }
  async deleteTrack(id: string): Promise<void> {
    if (!this.dbClient.get(`favorites:track:${id}`)) {
      throw new EntityNotFoundException('Favorite track');
    }

    this.dbClient.delete(`favorites:track:${id}`);

    return Promise.resolve();
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!this.dbClient.get(`favorites:album:${id}`)) {
      throw new EntityNotFoundException('Favorite album');
    }

    this.dbClient.delete(`favorites:album:${id}`);

    return Promise.resolve();
  }
}
