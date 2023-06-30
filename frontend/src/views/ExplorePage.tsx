import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { AnimatedPage } from '../animations/AnimatedPage';
import MainNavigation from '../components/navigation/MainNavigation';
import PostsThumbnailGrid from '../components/post/PostsThumbnailGrid';
import { getExplorePostsRoute } from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import IPost from '../interfaces/IPost';
import ProfileContainer from '../styles/ProfileContainerStyle';
import LoadingPage from './LoadingPage';

const ExplorePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    'explore',
    getExplorePostsRoute(),
    true,
    true
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    navigate('/404');
  }

  const posts = data as IPost[];

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <Container className="mt-3 d-flex justify-content-center">
        <ProfileContainer>
          <p className="fs-3 text-center shadow p-1">Explore</p>
          <AnimatedPage>
            <Row className="mt-3">
              <PostsThumbnailGrid isSameAsRequester posts={posts} />
            </Row>
          </AnimatedPage>
        </ProfileContainer>
      </Container>
    </div>
  );
};

export default ExplorePage;
