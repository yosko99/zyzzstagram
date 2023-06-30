import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import deleteImage from '../../functions/deleteImage';

import { TaksService } from './task.service';

@Injectable()
export class TasksServiceImpl implements TaksService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(TasksServiceImpl.name);

  async cleanOldStories(): Promise<void> {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const storyWhereQuery: Prisma.StoryWhereInput = {
      createdAt: {
        lt: yesterday,
      },
    };

    const stories = await this.prisma.story.findMany({
      where: storyWhereQuery,
      select: {
        imageURL: true,
      },
    });

    stories.forEach((story) => {
      deleteImage(story.imageURL);
    });

    await this.prisma.story.deleteMany({
      where: storyWhereQuery,
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    await this.cleanOldStories();
    this.logger.log('Old stories cleared up');
  }
}
