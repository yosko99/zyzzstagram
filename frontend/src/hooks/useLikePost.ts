import { useQueryClient } from 'react-query';

import { LIKE_POST_ROUTE } from '../constants/apiRoutes';
import IPost from '../interfaces/IPost';
import { usePostMutationWithToken } from './useUploadImage';

const useLikePost = (post: IPost) => {
  const { mutate } = usePostMutationWithToken(LIKE_POST_ROUTE + post.id, () => {
    post.likedByUser = !post.likedByUser;
  });
  const queryClient = useQueryClient();

  const handleClick = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
        },
        onError: (err) => {
          console.log(err);
        }
      }
    );
  };

  return { handleLike: handleClick };
};

export default useLikePost;
