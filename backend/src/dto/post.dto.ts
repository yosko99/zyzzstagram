import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  description: string;

  @ApiProperty()
  image?: Express.Multer.File;
}
