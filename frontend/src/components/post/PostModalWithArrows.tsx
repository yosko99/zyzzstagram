/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs';

import { getPostRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import CenteredItems from '../../styles/CenteredItems';
import Post from '../layout/Post';
import CustomModal from '../utils/CustomModal';
import LoadingSpinner from '../utils/LoadingSpinner';

interface Props {
  currentPost: IPost;
  posts: IPost[];
  activateButtonElement: React.ReactNode;
}

const PostModalWithArrows = ({
  currentPost,
  activateButtonElement,
  posts
}: Props) => {
  const [postIndex, setPostIndex] = useState(
    posts.findIndex((post) => post.id === currentPost.id)
  );
  const post = posts[postIndex];

  const { data, isLoading, refetch } = useFetch(
    `post-${post.id}`,
    getPostRoute(post.id),
    false,
    true
  );

  const postData = data as IPost;

  const handleClick = () => {
    window.history.pushState('', '', `/post/${post.id}`);
  };

  const handlePrevClick = () => {
    if (postIndex > 0) {
      setPostIndex(postIndex - 1);
    }
  };

  const handleForwardClick = () => {
    if (postIndex < posts!.length) {
      setPostIndex(postIndex + 1);
    }
  };

  useEffect(() => {
    refetch();
  }, [postIndex]);

  return (
    <CustomModal
      activateButtonOnClick={handleClick}
      modalBody={
        postData === undefined ? (
          <LoadingSpinner height="25vh" />
        ) : (
          <div className="d-flex">
            <CenteredItems className="d-none d-sm-flex">
              <BsFillArrowLeftCircleFill
                role="button"
                color="white"
                className="me-5"
                size={'2em'}
                onClick={handlePrevClick}
                style={{
                  position: 'absolute',
                  display: postIndex !== 0 ? 'block' : 'none'
                }}
              />
            </CenteredItems>
            <Post post={postData!} user={postData?.author} showComments />
            <CenteredItems className="d-none d-sm-flex">
              <BsFillArrowRightCircleFill
                className="ms-5"
                role="button"
                color="white"
                size={'2em'}
                onClick={handleForwardClick}
                style={{
                  position: 'absolute',
                  display: postIndex !== posts.length - 1 ? 'block' : 'none'
                }}
              />
            </CenteredItems>
          </div>
        )
      }
      activateButtonElement={activateButtonElement}
    />
  );
};

export default PostModalWithArrows;
