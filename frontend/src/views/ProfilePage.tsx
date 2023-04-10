/* eslint-disable multiline-ternary */
import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { MdOutlineCamera } from 'react-icons/md';
import styled from 'styled-components';

import FollowersButton from '../components/buttons/FollowersButton';
import FollowingButton from '../components/buttons/FollowingButton';
import UploadPostForm from '../components/forms/UploadPostForm';
import MainNavigation from '../components/navigation/MainNavigation';
import ProfileNavigation from '../components/navigation/ProfileNavigation';
import PostModalWithArrows from '../components/post/PostModalWithArrows';
import UserProfilePost from '../components/post/UserProfilePost';
import CustomModal from '../components/utils/CustomModal';
import {
  getCurrentUserRoute,
  PUBLIC_IMAGES_PREFIX
} from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import IUser from '../interfaces/IUser';
import CenteredItems from '../styles/CenteredItems';
import LoadingPage from './LoadingPage';

const ProfileContainer = styled.div`
  width: 100%;

  @media (min-width: 1000px) {
    width: 60%;
  }
`;

const ProfilePage = () => {
  const { data, isLoading, error } = useFetch(
    'profile posts',
    getCurrentUserRoute(),
    true,
    true
  );

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
                <p role="button" className="bg-light m-0 rounded p-1">
                  Edit profile
                </p>
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
            <ProfileNavigation />
          </Row>
          <Row className="mt-3">
            {user.posts?.length === 0 ? (
              <CenteredItems flexColumn style={{ height: '50vh' }}>
                <MdOutlineCamera className="display-4" />
                <p className="display-5">Share photos</p>
                <p>When you share photos, they will appear on your profile.</p>
                <CustomModal
                  activateButtonClassName="m-0 text-info"
                  activateButtonElement="Upload your first photo"
                  modalHeader={<p className="m-0">Upload your image</p>}
                  modalBody={<UploadPostForm />}
                />
              </CenteredItems>
            ) : (
              user.posts?.map((post, index: number) => (
                <Col xs={4} key={index} className="p-1">
                  <PostModalWithArrows
                    currentPost={post}
                    posts={user.posts!}
                    activateButtonElement={<UserProfilePost post={post} />}
                  />
                </Col>
              ))
            )}
          </Row>
        </ProfileContainer>
      </Container>
    </div>
  );
};

export default ProfilePage;
