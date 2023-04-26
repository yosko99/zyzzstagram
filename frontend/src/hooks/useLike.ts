import { useContext } from 'react';

import { useQueryClient } from 'react-query';

import {
  getLikeCommentRoute,
  getLikePostRoute,
  getLikeStoryRoute
} from '../constants/apiRoutes';
import { SocketContext } from '../context/SocketContext';
import LikeType from '../types/like.type';
import { useMutationWithToken } from './useUploadImage';

interface Props {
  id: string;
  commentId?: string;
  authorUsername: string;
  typeOfLike: LikeType;
}

const useLike = ({ id, authorUsername, typeOfLike, commentId }: Props) => {
  const socket = useContext(SocketContext);

  let routeURL = '';
  let queryKey = '';

  switch (typeOfLike) {
    case 'comment':
      routeURL = getLikeCommentRoute(id, commentId!);
      queryKey = `post-${id}`;
      break;
    case 'post':
      routeURL = getLikePostRoute(id);
      queryKey = `post-${id}`;
      break;
    case 'story':
      routeURL = getLikeStoryRoute(id);
      queryKey = 'stories';
      break;
  }

  const { mutate: likeMutation } = useMutationWithToken(routeURL, false);

  const queryClient = useQueryClient();

  const handleClick = async () => {
    likeMutation(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          queryClient.refetchQueries(queryKey);
          socket.emit('notification', authorUsername);
        }
      }
    );
  };

  return { handleLike: handleClick };
};

export default useLike;
