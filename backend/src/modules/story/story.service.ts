import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import IToken from '../../interfaces/IToken';
import IStory from '../../interfaces/IStory';

import deleteImage from '../../functions/deleteImage';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async createStory(filename: string, { username }: IToken) {
    const newStory = await this.prisma.story.create({
      data: {
        imageURL: filename,
        user: { connect: { username } },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return {
      message: 'Story created successfully',
      story: newStory,
    };
  }

  async deleteStory(story: IStory) {
    await this.prisma.story.delete({ where: { id: story.id } });

    deleteImage(story.imageURL);

    return {
      message: 'Story deleted successfully',
    };
  }
}
