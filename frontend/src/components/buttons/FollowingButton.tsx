/* eslint-disable multiline-ternary */
import React from 'react';

import IUser from '../../interfaces/IUser';
import FollowingButtonTemplate from '../../templates/FollowingButtonTemplate';

interface Props {
  user: IUser;
}

const FollowingButton = ({ user }: Props) => {
  return <FollowingButtonTemplate user={user} typeOfUsers="following" />;
};

export default FollowingButton;
