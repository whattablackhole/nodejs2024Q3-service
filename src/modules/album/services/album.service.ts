import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/models/dtos/album';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import { Album } from 'src/types/album';

@Injectable()
export class AlbumService {
  constructor(private dbClient: DatabaseClientService) {}

  async album(id: string): Promise<Album> {
    const track = this.dbClient.get(`album:${id}`);

    if (!track) {
      throw new EntityNotFoundException('Album');
    }

    return Promise.resolve(track);
  }

  async albums(): Promise<Album[]> {
    return Promise.resolve(this.dbClient.getAll(`album`));
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    this.dbClient.add(`album:${album.id}`, album);

    return Promise.resolve(album);
  }

  async updateAlbum({
    data,
    id,
  }: {
    data: UpdateAlbumDto;
    id: string;
  }): Promise<Album> {
    let album = this.dbClient.get(`album:${id}`) as Album | null;

    if (!album) {
      throw new EntityNotFoundException('Album');
    }

    album = {
      id: album.id,
      ...data,
    };

    this.dbClient.put(`album:${id}`, album);

    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const result = this.dbClient.delete(`album:${id}`);

    if (!result) {
      throw new EntityNotFoundException('Album');
    }

    this.dbClient.delete(`favorites:album:${id}`);

    const tracks = this.dbClient.getAll(`track`, {
      where: { albumId: id },
    });

    tracks.forEach((t) => {
      t.albumId = null;
      this.dbClient.put(`track:${t.id}`, t);
    });

    return Promise.resolve();
  }
}
