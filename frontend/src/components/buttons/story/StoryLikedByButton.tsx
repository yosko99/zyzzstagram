/* eslint-disable multiline-ternary */
import React from 'react';

import { AiFillHeart } from 'react-icons/ai';

import IUser from '../../../interfaces/IUser';
import CenteredItems from '../../../styles/CenteredItems';
import UserThumbnail from '../../user/UserThumbnail';
import CustomModal from '../../utils/CustomModal';

interface Props {
  likedBy: IUser[];
}

const StoryLikedByButton = ({ likedBy }: Props) => {
  return (
    <CustomModal
      activateButtonElement={
        <p className="m-0 fs-3" role="button">
          <AiFillHeart className="me-2" />
          {likedBy.length} likes
        </p>
      }
      modalHeader={<p className="text-center m-0">Likes</p>}
      modalBody={
        <div style={{ overflow: 'auto' }}>
          {likedBy?.length === 0 ? (
            <CenteredItems>
              <p className="my-5">It&apos;s a bit empty here</p>
            </CenteredItems>
          ) : (
            likedBy.map((follow, index: number) => (
              <UserThumbnail
                username={follow.username}
                imageURL={follow.imageURL}
                key={index}
              />
            ))
          )}
        </div>
      }
    />
  );
};

export default StoryLikedByButton;
