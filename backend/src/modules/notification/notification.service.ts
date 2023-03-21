import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import INotification from '../../interfaces/INotification';
import IToken from '../../interfaces/IToken';

import {
  CreateCommentNotificationDto,
  CreateLikeNotificationDto,
} from '../../dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createLikeNotification(
    { likedByUser, postId }: CreateLikeNotificationDto,
    { username }: IToken,
  ) {
    const author = await this.prisma.user.findUnique({ where: { username } });
    let message = '';

    if (likedByUser) {
      message = `${author.username} liked your post.`;
    } else {
      message = `${author.username} unliked your post.`;
    }

    const createdNotification = await this.prisma.notification.create({
      data: {
        user: { connect: { username } },
        message,
        post: { connect: { id: postId } },
      },
    });

    return {
      message: 'Like notification created',
      notification: createdNotification,
    };
  }

  async createCommentNotification(
    { postId, comment }: CreateCommentNotificationDto,
    { username }: IToken,
  ) {
    const author = await this.prisma.user.findUnique({ where: { username } });
    const message = `${author.username} commented on your post.`;

    const createdNotification = await this.prisma.notification.create({
      data: {
        user: { connect: { username } },
        post: { connect: { id: postId } },
        message,
        comment: {
          create: {
            content: comment,
            author: { connect: { username } },
            post: { connect: { id: postId } },
          },
        },
      },
    });

    return {
      message: 'Comment notification created',
      notification: createdNotification,
    };
  }

  async deleteNotification({ id }: INotification) {
    await this.prisma.notification.delete({ where: { id } });

    return {
      message: 'Notification deleted',
    };
  }
}
