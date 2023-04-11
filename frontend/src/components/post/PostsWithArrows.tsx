/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { Col } from 'react-bootstrap';
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
import GridPost from './GridPost';

interface Props {
  posts: IPost[];
}

const PostsWithArrows = ({ posts }: Props) => {
  const [postIndex, setPostIndex] = useState(0);
  const post = posts[postIndex];

  const { data, isLoading, refetch } = useFetch(
    `post-${post.id}`,
    getPostRoute(post.id),
    false,
    true
  );

  const postData = data as IPost;

  const handleClick = (postId: string) => {
    setPostIndex(posts.findIndex((post) => post.id === postId));
  };

  const handlePrevClick = () => {
    setPostIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleForwardClick = () => {
    setPostIndex((prev) =>
      prev < posts.length - 1 ? prev + 1 : posts.length - 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevClick();
        break;
      case 'ArrowRight':
        handleForwardClick();
        break;
    }
  };

  useEffect(() => {
    refetch();
  }, [postIndex]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e));

    return () => {
      window.removeEventListener('keydown', (e) => handleKeyDown(e));
    };
  }, []);

  return (
    <>
      {posts.map((post, index: number) => (
        <Col xs={4} key={index} className="p-1">
          <CustomModal
            activateButtonOnClick={() => handleClick(post.id)}
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
                        display:
                          postIndex !== posts.length - 1 ? 'block' : 'none'
                      }}
                    />
                  </CenteredItems>
                </div>
              )
            }
            activateButtonElement={<GridPost post={post} />}
          />
        </Col>
      ))}
    </>
  );
};

export default PostsWithArrows;
