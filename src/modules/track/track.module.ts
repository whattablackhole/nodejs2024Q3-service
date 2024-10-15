import { Module } from '@nestjs/common';
import { TrackController } from './controllers/track.controller';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [],
})
export class TrackModule {}
