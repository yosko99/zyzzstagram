import React from 'react';

import PostsThumbnailGrid from '../../../components/post/PostsThumbnailGrid';
import LoadingSpinner from '../../../components/utils/LoadingSpinner';
import { getCurrentUserSavedPostsRoute } from '../../../constants/apiRoutes';
import useFetch from '../../../hooks/useFetch';

const ProfilePageSavedTab = () => {
  const { isLoading, data } = useFetch(
    'saved-posts',
    getCurrentUserSavedPostsRoute(),
    true,
    true
  );

  if (isLoading) {
    return <LoadingSpinner height="40vh" />;
  }

  return <PostsThumbnailGrid isSameAsRequester posts={data} />;
};

export default ProfilePageSavedTab;
