import { useContext } from 'react';

import { useQueryClient } from 'react-query';

import { getLikeCommentRoute } from '../constants/apiRoutes';
import { SocketContext } from '../context/SocketContext';
import IComment from '../interfaces/IComment';
import IPost from '../interfaces/IPost';
import { useMutationWithToken } from './useUploadImage';

const useLikeComment = (post: IPost, comment: IComment) => {
  const socket = useContext(SocketContext);

  const { mutate: likeMutation } = useMutationWithToken(
    getLikeCommentRoute(post.id, comment.id),
    false,
    () => {
      comment.likedByUser = !comment.likedByUser;
    }
  );

  const queryClient = useQueryClient();

  const handleClick = async () => {
    likeMutation(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          queryClient.refetchQueries(`comment-${comment.id}`);
          socket.emit('notification', comment.author.username);
        }
      }
    );
  };

  return { handleLike: handleClick };
};

export default useLikeComment;
