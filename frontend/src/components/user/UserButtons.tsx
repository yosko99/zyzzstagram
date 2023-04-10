/* eslint-disable multiline-ternary */
import React from 'react';

import IUser from '../../interfaces/IUser';
import FollowButton from '../buttons/FollowButton';

interface Props {
  user: IUser;
}

const UserButtons = ({ user }: Props) => {
  return (
    <>
      {user.isSameAsRequester ? (
        <p role="button" className="bg-light m-0 rounded p-1">
          Edit profile
        </p>
      ) : (
        <>
          <FollowButton
            isFollowedByRequester={user.isFollowedByRequester}
            username={user.username}
          />
          <p role="button" className="bg-light m-0 rounded p-1 ms-2">
            Message
          </p>
        </>
      )}
    </>
  );
};

export default UserButtons;
