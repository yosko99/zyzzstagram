/* eslint-disable multiline-ternary */
import React from 'react';

import { getPostLikedByRoute } from '../../../constants/apiRoutes';
import useFetch from '../../../hooks/useFetch';
import IUser from '../../../interfaces/IUser';
import CenteredItems from '../../../styles/CenteredItems';
import UserThumbnail from '../../user/UserThumbnail';
import CustomModal from '../../utils/CustomModal';
import LoadingSpinner from '../../utils/LoadingSpinner';
import FollowButton from '../user/FollowButton';

interface Props {
  postId: string;
  numberOfLikes: number;
}

const LikedByButton = ({ postId, numberOfLikes }: Props) => {
  const { data, isLoading, refetch } = useFetch(
    `post-${postId}-likedBy`,
    getPostLikedByRoute(postId),
    false,
    true
  );

  const usersLikedThePost = data as IUser[];

  return (
    <CustomModal
      activateButtonOnClick={refetch}
      activateButtonElement={
        <p className="m-0" role="button">
          {numberOfLikes} likes
        </p>
      }
      modalHeader={<p className="text-center m-0">Likes</p>}
      modalBody={
        isLoading ? (
          <LoadingSpinner height="25vh" />
        ) : (
          <div style={{ overflow: 'auto' }}>
            {usersLikedThePost?.length === 0 ? (
              <CenteredItems>
                <p className="my-5">It&apos;s a bit empty here</p>
              </CenteredItems>
            ) : (
              usersLikedThePost?.map((follow, index: number) => (
                <UserThumbnail
                  username={follow.username}
                  imageURL={follow.imageURL}
                  key={index}
                  sideElement={
                    !follow.isSameAsRequester && (
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

export default LikedByButton;
