import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto, UpdateArtistDto } from 'src/models/dtos/artist';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { Artist } from 'src/types/artist';

@Injectable()
export class ArtistService {
  constructor(private dbClient: DatabaseClientService) {}

  async artist(id: string): Promise<Artist> {
    const artist = this.dbClient.get(`artist:${id}`);

    if (!artist) {
      throw new HttpException('Artist not found', 404);
    }

    return Promise.resolve(artist);
  }

  async artists(): Promise<Artist[]> {
    return Promise.resolve(this.dbClient.getAll(`artist`));
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    this.dbClient.add(`artist:${artist.id}`, artist);

    return Promise.resolve(artist);
  }

  async updateArtist({
    data,
    id,
  }: {
    data: UpdateArtistDto;
    id: string;
  }): Promise<Artist> {
    let artist = this.dbClient.get(`artist:${id}`) as Artist | null;

    if (!artist) {
      throw new HttpException('Artist not found', 404);
    }

    artist = {
      id: artist.id,
      ...data,
    };

    this.dbClient.put(`artist:${id}`, artist);

    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const result = this.dbClient.delete(`artist:${id}`);

    if (!result) {
      throw new HttpException('Artist not found', 404);
    }

    return Promise.resolve();
  }
}
