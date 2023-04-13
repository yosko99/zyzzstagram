/* eslint-disable multiline-ternary */
import React from 'react';

import { getPostRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import CustomModal from '../utils/CustomModal';
import LoadingSpinner from '../utils/LoadingSpinner';
import Post from './Post';

interface Props {
  post: IPost;
  activateButtonElement: React.ReactNode;
}

const PostModal = ({ post, activateButtonElement }: Props) => {
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

  return (
    <CustomModal
      activateButtonOnClick={handleClick}
      modalBody={
        postData === undefined ? (
          <LoadingSpinner height="25vh" />
        ) : (
          <Post post={postData!} user={postData?.author} showComments />
        )
      }
      activateButtonElement={activateButtonElement}
    />
  );
};

export default PostModal;
