import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import IToken from '../../interfaces/IToken';
import IStory from '../../interfaces/IStory';

import deleteImage from '../../functions/deleteImage';
import StoriesType from 'src/types/stories.type';

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

  async getStories({ username }: IToken, storiesType?: StoriesType) {
    switch (storiesType) {
      case 'following':
        return this.getFollowingStories(username);
      default:
        return this.getAllStories(username);
    }
  }

  private async getAllStories(username: string) {
    const stories = await this.prisma.story.findMany({
      include: {
        likedBy: {
          where: {
            username,
          },
          select: { username: true },
        },
      },
    });

    return stories.map((story) => {
      return {
        ...story,
        likedByUser: story.likedBy.length > 0,
      };
    });
  }

  private async getFollowingStories(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        following: {
          select: {
            stories: {
              select: {
                createdAt: true,
                imageURL: true,
                id: true,
                likedBy: {
                  where: {
                    username,
                  },
                  select: { username: true },
                },
              },
            },
          },
        },
      },
    });

    const followingStories = user.following.flatMap((follower) => {
      return follower.stories.map((story) => {
        return {
          ...story,
          likedByUser: story.likedBy.length > 0,
        };
      });
    });

    return followingStories;
  }
}
