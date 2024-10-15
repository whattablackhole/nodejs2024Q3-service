import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false })
  @Min(1900)
  @Max(2100)
  year: number;
  @IsUUID()
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
