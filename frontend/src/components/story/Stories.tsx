import React from 'react';

import Swiper, {
  Autoplay,
  EffectCards,
  Keyboard,
  Navigation,
  Pagination
} from 'swiper';
import { SwiperSlide, Swiper as SwiperSlider } from 'swiper/react';

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
  const handleSlideChange = (
    swiper: Swiper,
    event: MouseEvent | TouchEvent
  ) => {
    const { x } = event as MouseEvent & { x: number };

    if (x <= window.innerWidth / 2) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  };

  return (
    <SwiperSlider
      autoplay={{
        delay: 6000,
        stopOnLastSlide: true,
        disableOnInteraction: false
      }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      cardsEffect={{ slideShadows: false }}
      className="d-flex"
      keyboard
      onClick={(swiper, e) => handleSlideChange(swiper, e)}
      modules={[Keyboard, Autoplay, Navigation, Pagination, EffectCards]}
      navigation
      effect="cards"
      pagination={{ clickable: true }}
    >
      {stories &&
        stories.map((story, storyIndex: number) => (
          <SwiperSlide key={storyIndex} id={username}>
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
                    <span className="">
                      {dateFormatter(new Date(story.createdAt))}
                    </span>
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
    </SwiperSlider>
  );
};

export default Stories;
