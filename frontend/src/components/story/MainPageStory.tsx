import React from 'react';

import IStory from '../../interfaces/IStory';

interface Props {
  username: string;
  imageURL: string;
}

const MainPageStory = ({ imageURL, username }: Props) => {
  return (
    <div className="status-card">
      <div className="profile-pic">
        <img role={'button'} src={imageURL} alt={username} />
      </div>
      <p className="username">{username}</p>
    </div>
  );
};

export default MainPageStory;
