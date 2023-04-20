import React from 'react';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';

interface Props {
  username: string;
  imageURL: string;
  onClick: () => void;
}

const StoryBubble = ({ imageURL, username, onClick }: Props) => {
  return (
    <div className="status-card" onClick={onClick}>
      <div className="profile-pic">
        <img
          role={'button'}
          src={PUBLIC_IMAGES_PREFIX + imageURL}
          alt={username}
        />
      </div>
      <p className="username">{username}</p>
    </div>
  );
};

export default StoryBubble;
