import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeNotificationDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: 'boolean' })
  likedByUser: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  postId: string;
}

export class CreateCommentNotificationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  postId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({ maxLength: 250 })
  comment: string;
}
