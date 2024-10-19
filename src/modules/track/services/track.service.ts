import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from 'src/models/dtos/track';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import { Track } from 'src/types/track';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private dbClient: DatabaseClientService) {}

  async track(where: Prisma.TrackWhereUniqueInput): Promise<Track> {
    const track = await this.dbClient.track.findUnique({ where });

    if (!track) {
      throw new EntityNotFoundException('Track');
    }

    return track;
  }

  async tracks(): Promise<Track[]> {
    return await this.dbClient.track.findMany();
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.dbClient.track.create({ data: createTrackDto });
  }

  async updateTrack({
    data,
    where,
  }: {
    data: UpdateTrackDto;
    where: Prisma.TrackWhereUniqueInput;
  }): Promise<Track> {
    try {
      return await this.dbClient.track.update({ where, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Track');
      }
      throw error;
    }
  }

  async deleteTrack(where: Prisma.TrackWhereUniqueInput): Promise<void> {
    try {
      await this.dbClient.track.delete({ where });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('Track');
      }
      throw error;
    }
  }
}
