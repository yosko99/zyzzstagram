/* eslint-disable multiline-ternary */
import React from 'react';

import { Col } from 'react-bootstrap';
import { MdOutlineCamera } from 'react-icons/md';

import UploadPostForm from '../../../components/forms/UploadPostForm';
import PostModalWithArrows from '../../../components/post/PostModalWithArrows';
import UserProfilePost from '../../../components/post/UserProfilePost';
import CustomModal from '../../../components/utils/CustomModal';
import IPost from '../../../interfaces/IPost';
import CenteredItems from '../../../styles/CenteredItems';

interface Props {
  posts: IPost[];
  isSameAsRequester: boolean;
}

const ProfilePagePostTab = ({ posts, isSameAsRequester }: Props) => {
  return (
    <>
      {isSameAsRequester ? (
        posts?.length === 0 ? (
          <CenteredItems flexColumn style={{ height: '50vh' }}>
            <MdOutlineCamera className="display-4" />
            <p className="display-5">No posts yet</p>
          </CenteredItems>
        ) : (
          posts?.map((post, index: number) => (
            <Col xs={4} key={index} className="p-1">
              <PostModalWithArrows
                currentPost={post}
                posts={posts!}
                activateButtonElement={<UserProfilePost post={post} />}
              />
            </Col>
          ))
        )
      ) : posts?.length === 0 ? (
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
        posts?.map((post, index: number) => (
          <Col xs={4} key={index} className="p-1">
            <PostModalWithArrows
              currentPost={post}
              posts={posts!}
              activateButtonElement={<UserProfilePost post={post} />}
            />
          </Col>
        ))
      )}
    </>
  );
};

export default ProfilePagePostTab;
