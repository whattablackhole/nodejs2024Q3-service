import { Injectable } from '@nestjs/common';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { UnprocessableEntity } from 'src/modules/common/exceptions/entity.exception';
import { Favorites } from 'src/types/favorites';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private dbClient: DatabaseClientService) {}

  async favorites(): Promise<Favorites> {
    const [tracks, albums, artists] = await Promise.all([
      this.dbClient.favTrack
        .findMany({
          include: { track: true },
        })
        .then((favTracks) => favTracks.map((fav) => fav.track)),

      this.dbClient.favAlbum
        .findMany({
          include: { album: true },
        })
        .then((favAlbums) => favAlbums.map((fav) => fav.album)),

      this.dbClient.favArtist
        .findMany({
          include: { artist: true },
        })
        .then((favArtists) => favArtists.map((fav) => fav.artist)),
    ]);

    return { tracks, albums, artists };
  }

  async addTrack(id: string): Promise<void> {
    try {
      await this.dbClient.favTrack.create({ data: { trackId: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntity(
          'Provided entity data is not processable',
        );
      }
      throw error;
    }
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.dbClient.favAlbum.create({ data: { albumId: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntity(
          'Provided entity data is not processable',
        );
      }
      throw error;
    }
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.dbClient.favArtist.create({ data: { artistId: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntity(
          'Provided entity data is not processable',
        );
      }
      throw error;
    }
  }
  async deleteArtist(id: string): Promise<void> {
    try {
      await this.dbClient.favArtist.delete({
        where: { artistId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntity(
          'Provided entity data is not processable',
        );
      }
      throw error;
    }
  }
  async deleteTrack(id: string): Promise<void> {
    try {
      await this.dbClient.favTrack.delete({
        where: { trackId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntity(
          'Provided entity data is not processable',
        );
      }
      throw error;
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.dbClient.favAlbum.delete({
        where: { albumId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntity(
          'Provided entity data is not processable',
        );
      }
      throw error;
    }
  }
}
