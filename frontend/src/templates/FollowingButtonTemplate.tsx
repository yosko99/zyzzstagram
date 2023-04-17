/* eslint-disable multiline-ternary */
import React from 'react';

import FollowButton from '../components/buttons/user/FollowButton';
import UserThumbnail from '../components/user/UserThumbnail';
import CustomModal from '../components/utils/CustomModal';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import {
  getUserFollowersRoute,
  getUserFollowingRoute
} from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import IUser from '../interfaces/IUser';
import CenteredItems from '../styles/CenteredItems';

interface Props {
  user: IUser;
  typeOfUsers: 'following' | 'followers';
}

const FollowingButtonTemplate = ({ user, typeOfUsers }: Props) => {
  const { data, isLoading, refetch } = useFetch(
    `${user.username}-${typeOfUsers}`,
    typeOfUsers === 'following'
      ? getUserFollowingRoute(user.username)
      : getUserFollowersRoute(user.username),
    false,
    true
  );

  const followUsers = data as IUser[];

  return (
    <CustomModal
      activateButtonOnClick={refetch}
      activateButtonElement={
        <p className="ms-lg-3 m-0" role="button">
          {user._count![typeOfUsers]} {typeOfUsers}
        </p>
      }
      modalHeader={<p className="text-center m-0">{typeOfUsers}</p>}
      modalBody={
        isLoading ? (
          <LoadingSpinner height="25vh" />
        ) : (
          <div style={{ overflow: 'auto' }}>
            {followUsers?.length === 0 ? (
              <CenteredItems>
                <p className="my-5">It&apos;s a bit empty here</p>
              </CenteredItems>
            ) : (
              followUsers?.map((follow, index: number) => (
                <UserThumbnail
                  username={follow.username}
                  imageURL={follow.imageURL}
                  key={index}
                  sideElement={
                    user.isSameAsRequester && (
                      <FollowButton
                        isFollowedByRequester={follow.isFollowedByRequester}
                        username={follow.username}
                      />
                    )
                  }
                />
              ))
            )}
          </div>
        )
      }
    />
  );
};

export default FollowingButtonTemplate;
