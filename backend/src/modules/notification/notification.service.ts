import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import INotification from '../../interfaces/INotification';
import IComment from '../../interfaces/IComment';
import IToken from '../../interfaces/IToken';
import IPost from '../../interfaces/IPost';

import TypeOfLike from '../../types/typeOfLike.type';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  public async createLikeNotification(
    id: string,
    username: string,
    typeOfLike: TypeOfLike,
  ) {
    const { author } = await this.getAuthor(typeOfLike, id);

    if (author === null || author.username === username) {
      return {
        message: 'No action needed (same user)',
      };
    }

    let notification;
    let connectionObject = {};

    switch (typeOfLike) {
      case 'post':
        notification = await this.checkAlreadyCreatedNotification({
          senderUsername: username,
          operatorAND: [
            { postId: id },
            { receiver: { id: author.id } },
            { commentId: null },
          ],
        });

        connectionObject = { post: { connect: { id } } };
        break;
      case 'comment':
        const post = await this.prisma.post.findFirst({
          where: {
            comments: { some: { id } },
          },
        });
        notification = await this.checkAlreadyCreatedNotification({
          senderUsername: username,
          operatorAND: [
            { postId: post.id },
            { commentId: id },
            { receiver: { id: author.id } },
          ],
        });

        connectionObject = {
          comment: { connect: { id } },
          post: { connect: { id: post.id } },
        };
        break;
    }

    const message = this.getLikeNotificationMessage(typeOfLike, username);
    // Delete notification
    if (notification !== null) {
      await this.prisma.notification.delete({
        where: { id: notification.id },
      });
      return {
        message: 'Notification deleted (removed like)',
      };
      // Create notification
    } else {
      const createInput = {
        data: {
          receiver: {
            connect: { username: author.username },
          },
          sender: { connect: { username } },
          message,
          ...connectionObject,
        },
      };
      notification = await this.prisma.notification.create(createInput);
    }

    return {
      message: 'Like notification created',
      notification,
    };
  }

  private async getAuthor(
    typeOfLike: TypeOfLike,
    id: string,
  ): Promise<IPost | IComment | null> {
    switch (typeOfLike) {
      case 'post':
        return await this.getPostAuthor(id);
      case 'comment':
        return await this.getCommentAuthor(id);
    }
  }

  private getLikeNotificationMessage(typeOfLike: TypeOfLike, username: string) {
    switch (typeOfLike) {
      case 'post':
        return `${username} liked your post.`;
      case 'comment':
        return `${username} liked your comment.`;
    }
  }

  public async createFollowNotification(
    receiverUsername: string,
    username: string,
  ) {
    let notification = await this.checkAlreadyCreatedNotification({
      senderUsername: username,
      operatorAND: [
        { receiver: { username: receiverUsername } },
        { commentId: null },
        { postId: null },
      ],
    });

    const message = `${username} followed you.`;

    // Delete notification
    if (notification !== null) {
      notification = await this.prisma.notification.delete({
        where: { id: notification.id },
      });
      return {
        message: 'Notification deleted (user unfollowed)',
      };
      // Create notification
    } else {
      notification = await this.prisma.notification.create({
        data: {
          receiver: {
            connect: { username: receiverUsername },
          },
          sender: { connect: { username } },
          message,
        },
      });
    }

    return {
      message: 'Follow notification created',
      notification,
    };
  }

  public async createCommentNotification(
    postId: string,
    commentId: string,
    username: string,
  ) {
    const { author } = await this.getPostAuthor(postId);

    if (author === null || author.username === username) {
      return {
        message: 'No action needed (same user)',
      };
    }

    const message = `${username} commented on your post.`;

    const createdNotification = await this.prisma.notification.create({
      data: {
        receiver: {
          connect: { username: author.username },
        },
        sender: { connect: { username } },
        comment: { connect: { id: commentId } },
        post: { connect: { id: postId } },
        message,
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
      orderBy: {
        createdAt: 'desc',
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

  private async getPostAuthor(postId: string): Promise<IPost | null> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { author: { select: { username: true } } },
    });

    return post;
  }

  private async getCommentAuthor(commentId: string): Promise<IComment | null> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { author: { select: { username: true } } },
    });

    return comment;
  }

  private async checkAlreadyCreatedNotification({
    senderUsername,
    operatorAND,
  }: {
    senderUsername: string;
    operatorAND: Array<unknown>;
  }): Promise<INotification | null> {
    const linkedNotification = await this.prisma.notification.findFirst({
      where: {
        AND: [
          {
            sender: {
              username: senderUsername,
            },
          },
          ...operatorAND,
        ],
      },
    });

    return linkedNotification;
  }
}
