import React from 'react';

import { getPostRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import Post from '../layout/Post';
import CustomModal from '../utils/CustomModal';
import UserPost from './UserPost';

interface Props {
  post: IPost;
}

const PostModal = ({ post }: Props) => {
  const { data, isLoading, refetch } = useFetch(
    `post-${post.id}`,
    getPostRoute(post.id),
    false,
    true
  );

  const postData = data as IPost;

  return (
    <CustomModal
      activateButtonOnClick={refetch}
      modalBody={
        postData !== undefined && (
          <Post post={postData!} user={postData?.author} />
        )
      }
      activateButtonElement={<UserPost post={post} />}
    />
  );
};

export default PostModal;
