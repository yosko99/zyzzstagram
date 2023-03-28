import { useContext } from 'react';

import { useQueryClient } from 'react-query';

import {
  LIKE_POST_ROUTE,
  NOTIFICATIONS_LIKE_ROUTE
} from '../constants/apiRoutes';
import { SocketContext } from '../context/SocketContext';
import IPost from '../interfaces/IPost';
import { useMutationWithToken } from './useUploadImage';

const useLikePost = (post: IPost) => {
  const socket = useContext(SocketContext);

  const { mutate: likeMutation } = useMutationWithToken(
    LIKE_POST_ROUTE + post.id,
    false,
    () => {
      post.likedByUser = !post.likedByUser;
    }
  );
  const { mutate: notificationMutation } = useMutationWithToken(
    NOTIFICATIONS_LIKE_ROUTE,
    false
  );

  const queryClient = useQueryClient();

  const handleClick = async () => {
    notificationMutation({ likedByUser: !post.likedByUser, postId: post.id });
    likeMutation(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          socket.emit('notification', post.author.username);
        }
      }
    );
  };

  return { handleLike: handleClick };
};

export default useLikePost;
