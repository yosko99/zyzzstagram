import React from 'react';

import LoadingSpinner from '../../../components/utils/LoadingSpinner';
import { getCurrentUserSavedPostsRoute } from '../../../constants/apiRoutes';
import useFetch from '../../../hooks/useFetch';
import ProfilePagePostTab from './ProfilePagePostTab';

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

  return <ProfilePagePostTab isSameAsRequester posts={data} />;
};

export default ProfilePageSavedTab;
