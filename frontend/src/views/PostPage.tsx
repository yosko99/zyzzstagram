import React from 'react';

import { useParams } from 'react-router-dom';

import Post from '../components/layout/Post';
import MainNavigation from '../components/navigation/MainNavigation';
import { getPostRoute } from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import IPost from '../interfaces/IPost';
import LoadingPage from './LoadingPage';

const PostPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    `post-${id}`,
    getPostRoute(id as string),
    true,
    true
  );

  const post = data as IPost;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <Post post={post} user={post.author} className="mt-4" showComments />
    </div>
  );
};

export default PostPage;
