import React from 'react';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import useLikePost from '../../hooks/useLikePost';
import IStory from '../../interfaces/IStory';
import CenteredItems from '../../styles/CenteredItems';
import SwiperDiv from '../../styles/SwiperDiv';
import LikeButton from '../buttons/utils/LikeButton';
import CommentInput from '../inputs/CommentInput';
import UserThumbnail from '../user/UserThumbnail';

interface Props {
  story: IStory;
  imageURL: string;
  username: string;
}

const Story = ({ story, imageURL, username }: Props) => {
  return (
    <CenteredItems flexColumn style={{ height: '100vh' }}>
      <SwiperDiv
        className="text-white"
        height="90vh"
        hasShadow
        backgroundImage={`url('${PUBLIC_IMAGES_PREFIX}${story.imageURL}')`}
      >
        <UserThumbnail
          usernameClassName="text-white"
          imageURL={imageURL}
          username={username}
          additionalElement={
            <span className="">{dateFormatter(new Date(story.createdAt))}</span>
          }
        />
      </SwiperDiv>
      <div>
        <SwiperDiv className="d-flex">
          <CommentInput
            id={story.id}
            typeOfComment="story"
            authorUsername={username}
          />
          <CenteredItems>
            <LikeButton
              size="2em"
              likedByUser={story.likedByUser}
              // @ts-ignores
              useCustomLikeHook={useLikePost({})}
            />
          </CenteredItems>
        </SwiperDiv>
      </div>
    </CenteredItems>
  );
};

export default Story;
