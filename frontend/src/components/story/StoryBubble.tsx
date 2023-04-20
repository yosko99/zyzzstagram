import React from 'react';

interface Props {
  username: string;
  imageURL: string;
}

const StoryBubble = ({ imageURL, username }: Props) => {
  return (
    <div className="status-card">
      <div className="profile-pic">
        <img role={'button'} src={imageURL} alt={username} />
      </div>
      <p className="username">{username}</p>
    </div>
  );
};

export default StoryBubble;
