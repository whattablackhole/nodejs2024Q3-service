import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from 'src/models/dtos/artist';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { Artist } from 'src/types/artist';
import { EntityNotFoundException } from 'src/exceptions/entity.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private dbClient: DatabaseClientService) {}

  async artist(where: Prisma.ArtistWhereUniqueInput): Promise<Artist> {
    const artist = await this.dbClient.artist.findUnique({ where });

    if (!artist) {
      throw new EntityNotFoundException('Artist');
    }

    return artist;
  }

  async artists(): Promise<Artist[]> {
    return await this.dbClient.artist.findMany();
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    try {
      return await this.dbClient.artist.create({ data: createArtistDto });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Artist');
      }
      throw error;
    }
  }

  async updateArtist({
    data,
    where,
  }: {
    data: UpdateArtistDto;
    where: Prisma.ArtistWhereUniqueInput;
  }): Promise<Artist> {
    try {
      return await this.dbClient.artist.update({ where, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Artist');
      }
      throw error;
    }
  }

  async deleteArtist(where: Prisma.ArtistWhereUniqueInput): Promise<void> {
    try {
      await this.dbClient.artist.delete({ where });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Artist');
      }
      throw error;
    }
  }
}
