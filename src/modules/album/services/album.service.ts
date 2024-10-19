import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/models/dtos/album';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import { Album } from 'src/types/album';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AlbumService {
  constructor(private dbClient: DatabaseClientService) {}

  async album(where: Prisma.AlbumWhereUniqueInput): Promise<Album> {
    const track = await this.dbClient.album.findUnique({ where });

    if (!track) {
      throw new EntityNotFoundException('Album');
    }

    return track;
  }

  async albums(): Promise<Album[]> {
    return await this.dbClient.album.findMany();
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.dbClient.album.create({ data: createAlbumDto });
  }

  async updateAlbum({
    data,
    where,
  }: {
    data: UpdateAlbumDto;
    where: Prisma.AlbumWhereUniqueInput;
  }): Promise<Album> {
    try {
      return await this.dbClient.album.update({ where, data });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Album');
      }
      throw error;
    }
  }

  async deleteAlbum(where: Prisma.AlbumWhereUniqueInput): Promise<void> {
    try {
      await this.dbClient.album.delete({ where });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Album');
      }
      throw error;
    }
  }
}
