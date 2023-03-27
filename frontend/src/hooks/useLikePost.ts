import { useQueryClient } from 'react-query';

import {
  LIKE_POST_ROUTE,
  NOTIFICATIONS_LIKE_ROUTE
} from '../constants/apiRoutes';
import IPost from '../interfaces/IPost';
import { useMutationWithToken } from './useUploadImage';

const useLikePost = (post: IPost) => {
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
        }
      }
    );
  };

  return { handleLike: handleClick };
};

export default useLikePost;
