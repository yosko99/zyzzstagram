import React from 'react';

import { Container, Row } from 'react-bootstrap';

import MainNavigation from '../components/navigation/MainNavigation';
import PostsThumbnailGrid from '../components/post/PostsThumbnailGrid';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { getExplorePostsRoute } from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import IPost from '../interfaces/IPost';
import ProfileContainer from '../styles/ProfileContainerStyle';

const ExplorePage = () => {
  const { data, isLoading } = useFetch(
    'explore',
    getExplorePostsRoute(),
    true,
    true
  );

  if (isLoading) {
    return <LoadingSpinner height="40vh" />;
  }

  const posts = data as IPost[];

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <Container className="mt-3 d-flex justify-content-center">
        <ProfileContainer>
          <p className="fs-3 text-center shadow p-1">Explore</p>
          <Row className="mt-3">
            <PostsThumbnailGrid isSameAsRequester posts={posts} />
          </Row>
        </ProfileContainer>
      </Container>
    </div>
  );
};

export default ExplorePage;
