import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import IUser from '../../interfaces/IUser';

interface Props {
  user: IUser;
  additionalElement?: React.ReactNode;
  sideElement?: React.ReactNode;
}

const UserThumbnail = ({ user, additionalElement, sideElement }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="info">
      <div className="user">
        <div className="profile-pic">
          <Link to={`/profile/${user.username}`}>
            <img
              style={{ objectFit: 'cover' }}
              src={PUBLIC_IMAGES_PREFIX + user.imageURL}
              alt={user.username}
            />
          </Link>
        </div>
        <p
          className="username"
          role={'button'}
          onClick={() => navigate(`/profile/${user.username}`)}
        >
          {user.username} {additionalElement && additionalElement}
        </p>
      </div>
      {sideElement && sideElement}
    </div>
  );
};

export default UserThumbnail;
