import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;
  @IsUUID()
  artistId: string;
  @IsUUID()
  albumId: string;
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto extends CreateTrackDto {}
