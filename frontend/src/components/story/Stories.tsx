import React from 'react';

import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import useLikePost from '../../hooks/useLikePost';
import IStory from '../../interfaces/IStory';
import CenteredItems from '../../styles/CenteredItems';
import SwiperDiv from '../../styles/SwiperDiv';
import LikeButton from '../buttons/utils/LikeButton';
import CommentInput from '../inputs/CommentInput';
import UserThumbnail from '../user/UserThumbnail';

interface Props {
  stories: IStory[];
  username: string;
  imageURL: string;
  onAutoplayTimeLeft: (s: unknown, time: number, progress: number) => void;
}

const Stories = ({
  stories,
  username,
  imageURL,
  onAutoplayTimeLeft
}: Props) => {
  return (
    <Swiper
      autoplay={{
        delay: 6000,
        stopOnLastSlide: true,
        disableOnInteraction: false
      }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      cardsEffect={{ slideShadows: false }}
      className="d-flex"
      modules={[Autoplay, Navigation, Pagination, EffectCards]}
      navigation
      effect="cards"
      pagination={{ clickable: true }}
    >
      {stories.map((story, storyIndex: number) => (
        <SwiperSlide key={storyIndex} id={username}>
          <CenteredItems flexColumn style={{ height: '100vh' }}>
            <SwiperDiv
              className="text-white"
              height="90vh"
              backgroundImage={`url('${PUBLIC_IMAGES_PREFIX}${story.imageURL}')`}
            >
              <UserThumbnail
                usernameClassName="text-white"
                imageURL={imageURL}
                username={username}
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
                    likedByUser
                    // @ts-ignores
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useCustomLikeHook={useLikePost({})}
                  />
                </CenteredItems>
              </SwiperDiv>
            </div>
          </CenteredItems>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Stories;
