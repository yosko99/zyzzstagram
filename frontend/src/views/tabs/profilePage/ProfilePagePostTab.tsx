/* eslint-disable multiline-ternary */
import React from 'react';

import PostsThumbnailGrid from '../../../components/post/PostsThumbnailGrid';
import IPost from '../../../interfaces/IPost';

interface Props {
  posts: IPost[];
  isSameAsRequester: boolean;
}

const ProfilePagePostTab = ({ posts, isSameAsRequester }: Props) => {
  return (
    <PostsThumbnailGrid isSameAsRequester={isSameAsRequester} posts={posts} />
  );
};

export default ProfilePagePostTab;
