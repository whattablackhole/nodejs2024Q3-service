import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto, UpdateArtistDto } from 'src/models/dtos/artist';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { Artist } from 'src/types/artist';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';

@Injectable()
export class ArtistService {
  constructor(private dbClient: DatabaseClientService) {}

  async artist(id: string): Promise<Artist> {
    const artist = this.dbClient.get(`artist:${id}`);

    if (!artist) {
      throw new EntityNotFoundException('Artist');
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
      throw new EntityNotFoundException('Artist');
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
      throw new EntityNotFoundException('Artist');
    }

    this.dbClient.delete(`favorites:artist:${id}`);

    const tracks = this.dbClient.getAll(`track`, {
      where: { artistId: id },
    });

    tracks.forEach((t) => {
      t.artistId = null;
      this.dbClient.put(`track:${t.id}`, t);
    });

    const albums = this.dbClient.getAll(`album`, {
      where: { artistId: id },
    });

    albums.forEach((a) => {
      a.artistId = null;
      this.dbClient.put(`track:${a.id}`, a);
    });

    return Promise.resolve();
  }
}
