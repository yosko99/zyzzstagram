import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';

interface Props {
  username: string;
  imageURL: string;
  additionalElement?: React.ReactNode;
  sideElement?: React.ReactNode;
  onClick?: () => void;
  usernameClassName?: string;
}

const UserThumbnail = ({
  username,
  imageURL,
  additionalElement,
  sideElement,
  usernameClassName,
  onClick
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="info">
      <div className="user" onClick={onClick}>
        <div className="profile-pic">
          <Link to={`/profile/${username}`}>
            <img
              style={{ objectFit: 'cover' }}
              src={PUBLIC_IMAGES_PREFIX + imageURL}
              alt={username}
            />
          </Link>
        </div>
        <p
          className={`username ${usernameClassName && usernameClassName}`}
          role={'button'}
          onClick={() => navigate(`/profile/${username}`)}
        >
          {username} {additionalElement && additionalElement}
        </p>
      </div>
      {sideElement && sideElement}
    </div>
  );
};

export default UserThumbnail;
