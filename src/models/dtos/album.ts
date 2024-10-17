import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false })
  @Min(1900)
  @Max(2100)
  year: number;
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
