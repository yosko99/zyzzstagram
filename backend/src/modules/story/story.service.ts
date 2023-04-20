import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import IToken from '../../interfaces/IToken';
import IStory from '../../interfaces/IStory';

import appendLikeToUsersStories from '../../functions/story/appendLikeToUsersStories';
import getStorySelectQuery from '../../functions/story/getStorySelectQuery';
import deleteImage from '../../functions/deleteImage';

import StoriesType from '../../types/stories.type';

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
    const users = await this.prisma.user.findMany({
      select: {
        username: true,
        imageURL: true,
        stories: { select: getStorySelectQuery(username) },
      },
    });

    return appendLikeToUsersStories(users);
  }

  private async getFollowingStories(username: string) {
    const followingUsers = await this.prisma.user.findMany({
      where: {
        followers: {
          some: {
            username,
          },
        },
      },
      select: {
        username: true,
        imageURL: true,
        stories: { select: getStorySelectQuery(username) },
      },
    });

    const followingUsersWithStories = appendLikeToUsersStories(followingUsers);

    const currentUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        imageURL: true,
        stories: { select: getStorySelectQuery(username) },
      },
    });

    currentUser.stories.map((story) => {
      return {
        ...story,
        likedByUser: story.likedBy.length > 0,
      };
    });

    return {
      currentUser,
      followingUsersWithStories,
    };
  }
}
