/* eslint-disable multiline-ternary */
import React from 'react';

import { getPostRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import Post from '../layout/Post';
import CustomModal from '../utils/CustomModal';
import LoadingSpinner from '../utils/LoadingSpinner';
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

  const handleClick = () => {
    window.history.pushState('', '', `/post/${post.id}`);
    refetch();
  };

  const closeModal = () => {
    window.history.back();
  };

  return (
    <CustomModal
      activateButtonOnClick={handleClick}
      onCloseFunction={closeModal}
      modalBody={
        postData === undefined ? (
          <LoadingSpinner height="25vh" />
        ) : (
          <Post post={postData!} user={postData?.author} />
        )
      }
      activateButtonElement={<UserPost post={post} />}
    />
  );
};

export default PostModal;
