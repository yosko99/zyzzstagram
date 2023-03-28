/* eslint-disable multiline-ternary */
import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { AiFillTags } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaVoteYea } from 'react-icons/fa';
import { MdOutlineCamera } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from '../components/layout/Navigation';
import UserPost from '../components/layout/UserPost';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { PUBLIC_IMAGES_PREFIX, USER_ROUTE } from '../constants/apiRoutes';
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
  const params = useParams();

  const { data, isLoading, error } = useFetch(
    `profile-${params.username}`,
    USER_ROUTE + params.username,
    true,
    true
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  const { user, isFollowedByRequester } = data as {
    user: IUser;
    isFollowedByRequester: boolean;
  };

  return (
    <div className="d-flex flex-lg-row flex-column">
      <Navigation />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
                    {isFollowedByRequester ? 'Following' : 'Follow'}
                  </p>
                  <p role="button" className="bg-light m-0 rounded p-1 ms-2">
                    Message
                  </p>
                </div>
                <div className="d-flex w-100 justify-content-around justify-content-lg-start my-3">
                  <p className="me-lg-3 m-0">{user._count?.posts} posts</p>
                  <p className="mx-lg-3 m-0">
                    {user._count?.followers} followers
                  </p>
                  <p className="ms-lg-3 m-0">
                    {user._count?.following} following
                  </p>
                </div>
                <p>Bio</p>
              </Col>
            </Row>
            <Row className="mt-3">
              <hr className="m-0 mx-2" />
              <div className="text-uppercase d-flex justify-content-around justify-content-lg-center">
                <div className="me-3 mt-2">
                  <div role={'button'} className="d-block d-lg-none fs-2">
                    <BsFillGrid3X3GapFill />
                  </div>
                  <span role={'button'} className="d-none d-lg-block">
                    Posts
                  </span>
                </div>
                <div className="mx-3 mt-2">
                  <div role={'button'} className="d-block d-lg-none fs-2">
                    <FaVoteYea />
                  </div>
                </div>
                <div className="ms-3 mt-2">
                  <div role={'button'} className="d-block d-lg-none fs-2">
                    <AiFillTags />
                  </div>
                  <span role={'button'} className="d-none d-lg-block">
                    Tagged
                  </span>
                </div>
              </div>
            </Row>
            <Row className="mt-3">
              {user.posts?.length === 0 ? (
                <CenteredItems flexColumn style={{ height: '50vh' }}>
                  <MdOutlineCamera className="display-4" />
                  <p className="display-5">No posts yet</p>
                </CenteredItems>
              ) : (
                user.posts?.map((post, index: number) => (
                  <Col xs={4} key={index} className="p-1">
                    <UserPost post={post} />
                  </Col>
                ))
              )}
            </Row>
          </ProfileContainer>
        </Container>
      )}
    </div>
  );
};

export default ProfilePage;