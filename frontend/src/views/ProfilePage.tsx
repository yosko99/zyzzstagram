/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

import FollowersButton from '../components/buttons/FollowersButton';
import FollowingButton from '../components/buttons/FollowingButton';
import MainNavigation from '../components/navigation/MainNavigation';
import ProfileNavigation from '../components/navigation/ProfileNavigation';
import UserButtons from '../components/user/UserButtons';
import {
  getCurrentUserRoute,
  PUBLIC_IMAGES_PREFIX
} from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import IUser from '../interfaces/IUser';
import ProfileContainer from '../styles/ProfileContainerStyle';
import LoadingPage from './LoadingPage';
import ProfilePagePostTab from './tabs/profilePage/ProfilePagePostTab';

const ProfilePage = () => {
  const { data, isLoading, error } = useFetch(
    'profile posts',
    getCurrentUserRoute(),
    true,
    true
  );
  const [currentTab, setCurrentTab] = useState<React.ReactNode>(null);

  const user = data as IUser;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <Container className="mt-3 d-flex justify-content-center">
        <ProfileContainer>
          <Row>
            <Col
              xs={4}
              className="d-flex justify-content-center align-items-center"
            >
              <Image
                src={PUBLIC_IMAGES_PREFIX + user.imageURL}
                height={'120px'}
                width={'120px'}
                roundedCircle
              />
            </Col>
            <Col xs={8}>
              <div className="d-flex mt-2 flex-wrap">
                <p className="fs-4 m-0 me-3 text-break">{user.username}</p>
                <UserButtons user={user} />
              </div>
              <div className="d-flex w-100 justify-content-around justify-content-lg-start my-3">
                <p className="me-lg-3 m-0">{user._count?.posts} posts</p>
                <FollowersButton user={user} />
                <FollowingButton user={user} />
              </div>
              <p>Bio</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <hr className="m-0 mx-2" />
            <ProfileNavigation user={user} setCurrentTab={setCurrentTab} />
          </Row>
          <Row className="mt-3">
            {currentTab === null ? (
              <ProfilePagePostTab
                isSameAsRequester={user.isSameAsRequester}
                posts={user.posts!}
              />
            ) : (
              currentTab
            )}
          </Row>
        </ProfileContainer>
      </Container>
    </div>
  );
};

export default ProfilePage;
