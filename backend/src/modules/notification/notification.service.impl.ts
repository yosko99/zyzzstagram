import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import INotification from '../../interfaces/INotification';
import IToken from '../../interfaces/IToken';

import LikeType from '../../types/like.type';

@Injectable()
export class NotificationServiceImpl {
  constructor(private prisma: PrismaService) {}

  public async createLikeNotification(
    id: string,
    username: string,
    typeOfLike: LikeType,
  ) {
    const authorUsername = await this.getAuthorUsername(typeOfLike, id);

    if (authorUsername === username) {
      return {
        message: 'No action needed (same user)',
      };
    }

    const { connectionObject, notification } =
      await this.getNotificationAndConnectionObject(
        typeOfLike,
        id,
        username,
        authorUsername,
      );

    const message = this.getLikeNotificationMessage(typeOfLike, username);

    if (notification !== null) {
      await this.prisma.notification.delete({
        where: { id: notification.id },
      });
      return {
        message: 'Notification deleted (removed like)',
      };
    } else {
      const createInput = {
        data: {
          receiver: {
            connect: { username: authorUsername },
          },
          sender: { connect: { username } },
          message,
          ...connectionObject,
        },
      };

      return {
        message: 'Like notification created',
        notification: await this.prisma.notification.create(createInput),
      };
    }
  }

  private async getNotificationAndConnectionObject(
    typeOfLike: string,
    id: string,
    username: string,
    authorUsername: string,
  ) {
    let notification;
    let connectionObject = {};

    switch (typeOfLike) {
      case 'post':
        notification = await this.checkAlreadyCreatedNotification({
          senderUsername: username,
          operatorAND: [
            { postId: id },
            { receiver: { username: authorUsername } },
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
            { receiver: { username: authorUsername } },
          ],
        });

        connectionObject = {
          comment: { connect: { id } },
          post: { connect: { id: post.id } },
        };
        break;
      case 'story':
        notification = await this.checkAlreadyCreatedNotification({
          senderUsername: username,
          operatorAND: [
            { storyId: id },
            { receiver: { username: authorUsername } },
          ],
        });

        connectionObject = {
          story: { connect: { id } },
        };
        break;
    }

    return { notification, connectionObject };
  }

  private async getAuthorUsername(
    typeOfLike: LikeType,
    id: string,
  ): Promise<string> {
    switch (typeOfLike) {
      case 'post':
        return await this.getPostAuthorUsername(id);
      case 'comment':
        return await this.getCommentAuthorUsername(id);
      case 'story':
        return await this.getStoryAuthorUsername(id);
    }
  }

  private getLikeNotificationMessage(typeOfLike: LikeType, username: string) {
    switch (typeOfLike) {
      case 'post':
        return `${username} liked your post`;
      case 'comment':
        return `${username} liked your comment`;
      case 'story':
        return `${username} liked your story`;
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
    const authorUsername = await this.getPostAuthorUsername(postId);

    if (authorUsername === username) {
      return {
        message: 'No action needed (same user)',
      };
    }

    const message = `${username} commented on your post`;

    const createdNotification = await this.prisma.notification.create({
      data: {
        receiver: {
          connect: { username: authorUsername },
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
      select: {
        comment: true,
        message: true,
        read: true,
        sender: { select: { username: true, imageURL: true } },
        createdAt: true,
        story: { select: { imageURL: true } },
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

  private async getPostAuthorUsername(postId: string): Promise<string> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { author: { select: { username: true } } },
    });

    return post.author.username;
  }

  private async getCommentAuthorUsername(commentId: string): Promise<string> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { author: { select: { username: true } } },
    });

    return comment.author.username;
  }

  private async getStoryAuthorUsername(storyId: string): Promise<string> {
    const story = await this.prisma.story.findUnique({
      where: { id: storyId },
      select: { user: { select: { username: true } } },
    });

    return story.user.username;
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
