import React from 'react';

import IStory from '../../interfaces/IStory';

interface Props {
  story: IStory;
}

const Story = ({ story }: Props) => {
  return (
    <div className="status-card">
      <div className="profile-pic">
        <img src={story.user.imageURL} alt={story.user.username} />
      </div>
      <p className="username">{story.user.username}</p>
    </div>
  );
};

export default Story;
