import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  content: string;
}
