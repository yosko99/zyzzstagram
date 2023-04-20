/* eslint-disable multiline-ternary */
import React from 'react';

import { getCurrentUserSuggestedUsers } from '../../constants/apiRoutes';
import suggestionPanelTabs from '../../data/suggestionPanelTabs';
import useFetch from '../../hooks/useFetch';
import IUser from '../../interfaces/IUser';
import FollowButton from '../buttons/user/FollowButton';
import UserThumbnail from '../user/UserThumbnail';
import LoadingSpinner from '../utils/LoadingSpinner';

const SuggestionPanel = () => {
  const { isLoading, data } = useFetch(
    'suggested-users',
    getCurrentUserSuggestedUsers(),
    true,
    true
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { currentUser, suggestedUsers } = data as {
    currentUser: IUser;
    suggestedUsers: IUser[];
  };

  return (
    <div className="ms-5 mt-3 d-none d-lg-block" style={{ width: '320px' }}>
      <UserThumbnail
        imageURL={currentUser.imageURL}
        username={currentUser.username}
      />

      <p className="ms-4">Suggestions for you</p>
      {suggestedUsers.map((user, index: number) => (
        <UserThumbnail
          key={index}
          imageURL={user.imageURL}
          username={user.username}
          sideElement={
            <FollowButton
              isFollowedByRequester={user.isFollowedByRequester}
              username={user.username}
            />
          }
        />
      ))}
      <div
        className="d-flex flex-wrap ms-4 mt-3 text-muted"
        style={{ fontSize: '0.9em' }}
      >
        {suggestionPanelTabs.map((tab, index: number) => (
          <a key={index} role="button" className="mx-1 text-muted">
            {tab}
          </a>
        ))}
        <p className="text-uppercase mt-4">© Zysstagram from yosko99</p>
      </div>
    </div>
  );
};

export default SuggestionPanel;
