import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryDto {
  @ApiProperty()
  image?: Express.Multer.File;
}

export class GetStoryDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly imageURL: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly userId?: string;

  @ApiProperty()
  readonly likedByUser?: boolean;
}

export class GetFollowingStoriesDto {
  @ApiProperty({ type: () => [GetStoryDto] })
  readonly userStories: GetStoryDto[];

  @ApiProperty({ type: () => [GetStoryDto] })
  readonly followingStories: GetStoryDto[];
}
