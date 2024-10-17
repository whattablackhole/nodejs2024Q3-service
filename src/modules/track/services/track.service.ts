import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTrackDto, UpdateTrackDto } from 'src/models/dtos/track';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import { Track } from 'src/types/track';

@Injectable()
export class TrackService {
  constructor(private dbClient: DatabaseClientService) {}

  async track(id: string): Promise<Track> {
    const track = this.dbClient.get(`track:${id}`);

    if (!track) {
      throw new EntityNotFoundException('Track');
    }

    return Promise.resolve(track);
  }

  async tracks(): Promise<Track[]> {
    return Promise.resolve(this.dbClient.getAll(`track`));
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      id: randomUUID(),
      ...createTrackDto,
    };
    this.dbClient.add(`track:${track.id}`, track);

    return Promise.resolve(track);
  }

  async updateTrack({
    data,
    id,
  }: {
    data: UpdateTrackDto;
    id: string;
  }): Promise<Track> {
    let track = this.dbClient.get(`track:${id}`) as Track | null;

    if (!track) {
      throw new EntityNotFoundException('Track');
    }

    track = {
      id: track.id,
      ...data,
    };

    this.dbClient.put(`track:${id}`, track);

    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const result = this.dbClient.delete(`track:${id}`);

    if (!result) {
      throw new EntityNotFoundException('Track');
    }

    this.dbClient.delete(`favorites:track:${id}`);

    return Promise.resolve();
  }
}
