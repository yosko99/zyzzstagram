/* eslint-disable multiline-ternary */
import React from 'react';

import IUser from '../../interfaces/IUser';
import FollowingButtonTemplate from '../../templates/FollowingButtonTemplate';

interface Props {
  user: IUser;
}

const FollowersButton = ({ user }: Props) => {
  return <FollowingButtonTemplate user={user} typeOfUsers="followers" />;
};

export default FollowersButton;
