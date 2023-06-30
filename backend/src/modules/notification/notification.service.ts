import IToken from 'src/interfaces/IToken';

import LikeType from 'src/types/like.type';

export interface NotificationService {
  createLikeNotification(id: string, username: string, typeOfLike: LikeType);

  createFollowNotification(receiverUsername: string, username: string);

  createCommentNotification(
    postId: string,
    commentId: string,
    username: string,
  );

  getCurrentUserNotifications({ username }: IToken);

  markNotificationsAsRead({ username }: IToken);
}

export const NotificationService = Symbol('NotificationService');
