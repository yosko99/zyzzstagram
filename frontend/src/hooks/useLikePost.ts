import { useQueryClient } from 'react-query';

import {
  LIKE_POST_ROUTE,
  NOTIFICATIONS_LIKE_ROUTE
} from '../constants/apiRoutes';
import IPost from '../interfaces/IPost';
import { usePostMutationWithToken } from './useUploadImage';

const useLikePost = (post: IPost) => {
  const { mutate: likeMutation } = usePostMutationWithToken(
    LIKE_POST_ROUTE + post.id,
    () => {
      post.likedByUser = !post.likedByUser;
    }
  );
  const { mutate: notificationMutation } = usePostMutationWithToken(
    NOTIFICATIONS_LIKE_ROUTE
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
