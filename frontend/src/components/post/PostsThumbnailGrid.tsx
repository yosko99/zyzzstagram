/* eslint-disable multiline-ternary */
import React from 'react';

import { MdOutlineCamera } from 'react-icons/md';

import IPost from '../../interfaces/IPost';
import CenteredItems from '../../styles/CenteredItems';
import UploadPostForm from '../forms/UploadPostForm';
import CustomModal from '../utils/CustomModal';
import PostsWithArrows from './PostsWithArrows';

interface Props {
  posts: IPost[];
  isSameAsRequester: boolean;
}

const PostsThumbnailGrid = ({ posts, isSameAsRequester }: Props) => {
  return (
    <>
      {isSameAsRequester ? (
        posts?.length === 0 ? (
          <CenteredItems flexColumn style={{ height: '50vh' }}>
            <MdOutlineCamera className="display-4" />
            <p className="display-5">No posts yet</p>
          </CenteredItems>
        ) : (
          <PostsWithArrows posts={posts!} />
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
        <PostsWithArrows posts={posts!} />
      )}
    </>
  );
};

export default PostsThumbnailGrid;
