import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from 'src/types/artist';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the artist', example: 'Adele' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the artist has won a Grammy award',
    example: true,
  })
  grammy: boolean;
}

export class UpdateArtistDto extends CreateArtistDto {}

export class ArtistDto implements Artist {
  @ApiProperty({
    description: 'The unique identifier for the artist',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'The name of the artist', example: 'Adele' })
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy award',
    example: true,
  })
  grammy: boolean;
}
