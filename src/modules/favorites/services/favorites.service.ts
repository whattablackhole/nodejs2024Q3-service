import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FavoritesResponse } from 'src/models/dtos/favorites';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Favorites } from 'src/types/favorites';
import { Track } from 'src/types/track';

@Injectable()
export class FavoritesService {
  constructor(private dbClient: DatabaseClientService) {}
  
  async favorites(): Promise<FavoritesResponse> {
    let response = {
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

  async addTrack(id: string): Promise<string> {
    if (!this.dbClient.get(`track:${id}`)) {
      throw new HttpException("Track doesn't exist", 422);
    }

    this.dbClient.add(`favorites:track:${id}`, id);

    return Promise.resolve('Track was added to favs successfuly');
  }

  async addAlbum(id: string): Promise<string> {
    if (!this.dbClient.get(`album:${id}`)) {
      throw new HttpException("Album doesn't exist", 422);
    }

    this.dbClient.add(`favorites:album:${id}`, id);

    return Promise.resolve('Album was added to favorites successfuly');
  }

  async addArtist(id: string): Promise<string> {
    if (!this.dbClient.get(`artist:${id}`)) {
      throw new HttpException("Artist doesn't exist", 422);
    }

    this.dbClient.add(`favorites:artist:${id}`, id);

    return Promise.resolve('Artist was added to favorites successfuly');
  }
  async deleteArtist(id: string): Promise<void> {
    if (!this.dbClient.get(`favorites:artist:${id}`)) {
      throw new HttpException("Artist doesn't exist in favorites", 404);
    }

    this.dbClient.delete(`favorites:artist:${id}`);

    return Promise.resolve();
  }
  async deleteTrack(id: string): Promise<void> {
    if (!this.dbClient.get(`favorites:track:${id}`)) {
      throw new HttpException("Track doesn't exist in favorites", 404);
    }

    this.dbClient.delete(`favorites:track:${id}`);

    return Promise.resolve();
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!this.dbClient.get(`favorites:album:${id}`)) {
      throw new HttpException("Album doesn't exist in favorites", 404);
    }

    this.dbClient.delete(`favorites:album:${id}`);

    return Promise.resolve();
  }
}
