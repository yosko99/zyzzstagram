import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  image?: Express.Multer.File;
}
