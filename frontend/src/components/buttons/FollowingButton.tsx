/* eslint-disable multiline-ternary */
import React from 'react';

import { getUserFollowingRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IUser from '../../interfaces/IUser';
import CenteredItems from '../../styles/CenteredItems';
import UserThumbnail from '../user/UserThumbnail';
import CustomModal from '../utils/CustomModal';
import LoadingSpinner from '../utils/LoadingSpinner';
import FollowButton from './FollowButton';

interface Props {
  user: IUser;
}

const FollowingButton = ({ user }: Props) => {
  const { data, isLoading, refetch } = useFetch(
    `${user.username}-following`,
    getUserFollowingRoute(user.username),
    false,
    true
  );

  const following = data as IUser[];

  return (
    <CustomModal
      activateButtonOnClick={refetch}
      activateButtonElement={
        <p className="ms-lg-3 m-0" role="button">
          {user._count?.following} following
        </p>
      }
      modalHeader={<p className="text-center m-0">Following</p>}
      modalBody={
        isLoading ? (
          <LoadingSpinner height="25vh" />
        ) : (
          <div style={{ overflow: 'auto' }}>
            {following?.length === 0 ? (
              <CenteredItems>
                <p className="my-5">It&apos;s a bit empty here</p>
              </CenteredItems>
            ) : (
              following?.map((follow, index: number) => (
                <UserThumbnail
                  user={follow}
                  key={index}
                  sideElement={
                    <FollowButton
                      isFollowedByRequester={follow.isFollowedByRequester}
                      username={follow.username}
                    />
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

export default FollowingButton;
