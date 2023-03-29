import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import INotification from '../../interfaces/INotification';
import IToken from '../../interfaces/IToken';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  public async createLikeNotification(
    likedByUser: boolean,
    postId: string,
    username: string,
  ) {
    const notificationAuthor = await this.prisma.user.findUnique({
      where: { username },
    });
    let message = '';

    const postCreatorUsername = await this.getPostCreatorUsername(
      postId,
      notificationAuthor.username,
    );

    if (postCreatorUsername === null) {
      return {
        message: 'No action needed (same user)',
      };
    }

    let notification = await this.getLinkedNotification(username, postId);

    // Update notification
    if (notification !== null) {
      if (!likedByUser) {
        message = `${notificationAuthor.username} unliked your post.`;
      } else {
        message = `${notificationAuthor.username} liked your post.`;
      }

      notification = await this.prisma.notification.update({
        where: { id: notification.id },
        data: { message },
      });
      // Create notification
    } else {
      if (likedByUser) {
        message = `${notificationAuthor.username} liked your post.`;
      } else {
        message = `${notificationAuthor.username} unliked your post.`;
      }

      notification = await this.prisma.notification.create({
        data: {
          receiver: {
            connect: { username: postCreatorUsername },
          },
          sender: { connect: { username } },
          message,
          post: { connect: { id: postId } },
        },
      });
    }

    return {
      message: 'Like notification created',
      notification,
    };
  }

  public async createCommentNotification(
    postId: string,
    comment: string,
    username: string,
  ) {
    const commentAuthor = await this.prisma.user.findUnique({
      where: { username },
    });
    const message = `${commentAuthor.username} commented on your post.`;

    const postCreatorUsername = await this.getPostCreatorUsername(
      postId,
      commentAuthor.username,
    );

    if (postCreatorUsername === null) {
      return {
        message: 'No action needed (same user)',
      };
    }

    const createdNotification = await this.prisma.notification.create({
      data: {
        receiver: {
          connect: { username: postCreatorUsername },
        },
        sender: { connect: { username } },
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

  async getCurrentUserNotifications({ username }: IToken) {
    const notifications = await this.prisma.notification.findMany({
      where: { receiver: { username } },
      include: {
        sender: { select: { imageURL: true, username: true } },
        post: { select: { imageURL: true, id: true } },
      },
    });

    return notifications;
  }

  async deleteNotification({ id }: INotification) {
    await this.prisma.notification.delete({ where: { id } });

    return {
      message: 'Notification deleted',
    };
  }

  async markNotificationsAsRead({ username }: IToken) {
    await this.prisma.notification.updateMany({
      where: { receiver: { username } },
      data: {
        read: true,
      },
    });

    return {
      message: 'Notifications marked as read',
    };
  }

  private async getPostCreatorUsername(
    postId: string,
    authorUsername: string,
  ): Promise<string | null> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { author: { select: { username: true } } },
    });

    if (post.author.username === authorUsername) {
      return null;
    }

    return post.author.username;
  }

  private async getLinkedNotification(
    senderUsername: string,
    postId: string,
  ): Promise<INotification | null> {
    const linkedNotification = await this.prisma.notification.findFirst({
      where: {
        AND: [
          {
            sender: {
              username: senderUsername,
            },
          },
          { postId },
        ],
      },
    });

    return linkedNotification;
  }
}
