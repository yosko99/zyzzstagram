import React from 'react';

import IUser from '../../interfaces/IUser';

interface Props {
  user: IUser;
}

const FollowersButton = ({ user }: Props) => {
  return (
    <p className="mx-lg-3 m-0" role="button">
      {user._count?.followers} followers
    </p>
  );
};

export default FollowersButton;
