import React, { useEffect, useState } from 'react';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import useLike from '../../hooks/useLike';
import IStory from '../../interfaces/IStory';
import CenteredItems from '../../styles/CenteredItems';
import SwiperDiv from '../../styles/SwiperDiv';
import LikeButton from '../buttons/utils/LikeButton';
import StoryInput from '../inputs/StoryInput';
import UserThumbnail from '../user/UserThumbnail';

interface Props {
  story: IStory;
  imageURL: string;
  username: string;
}

const Story = ({ story, imageURL, username }: Props) => {
  const [isSentReply, setIsSentReply] = useState(false);

  useEffect(() => {
    if (isSentReply) {
      setTimeout(() => {
        setIsSentReply(false);
      }, 1000);
    }
  }, [isSentReply]);

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
        {isSentReply && (
          <CenteredItems className={'h-100'}>
            <p
              className={
                'bg-white fs-4 shadow-lg rounded text-black p-3  animate__backOutRight'
              }
            >
              Message sent
            </p>
          </CenteredItems>
        )}
      </SwiperDiv>
      <div>
        <SwiperDiv className="d-flex">
          <StoryInput
            setIsSentReply={setIsSentReply}
            receiverUsername={username}
          />
          <CenteredItems>
            <LikeButton
              fakeUpdate
              size="2em"
              likedByUser={story.likedByUser}
              useCustomLikeHook={useLike({
                id: story.id,
                authorUsername: username,
                typeOfLike: 'story'
              })}
            />
          </CenteredItems>
        </SwiperDiv>
      </div>
    </CenteredItems>
  );
};

export default Story;
