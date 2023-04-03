import { useContext } from 'react';

import { useQueryClient } from 'react-query';

import { getLikePostRoute } from '../constants/apiRoutes';
import { SocketContext } from '../context/SocketContext';
import IPost from '../interfaces/IPost';
import { useMutationWithToken } from './useUploadImage';

const useLikePost = (post: IPost) => {
  const socket = useContext(SocketContext);

  const { mutate: likeMutation } = useMutationWithToken(
    getLikePostRoute(post.id),
    false,
    () => {
      post.likedByUser = !post.likedByUser;
    }
  );

  const queryClient = useQueryClient();

  const handleClick = async () => {
    likeMutation(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          queryClient.refetchQueries(`post-${post.id}`);
          socket.emit('notification', post.author.username);
        }
      }
    );
  };

  return { handleLike: handleClick };
};

export default useLikePost;
