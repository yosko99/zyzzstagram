import React from 'react';

import Swiper, { EffectCards, Keyboard, Navigation } from 'swiper';
import { SwiperSlide, Swiper as SwiperSlider } from 'swiper/react';

import IStory from '../../interfaces/IStory';
import Story from './Story';

interface Props {
  stories: IStory[];
  username: string;
  imageURL: string;
}

const InnerStorySwiper = ({ stories, username, imageURL }: Props) => {
  const handleSlideChange = (
    swiper: Swiper,
    event: MouseEvent | TouchEvent
  ) => {
    const { x, y } = event as MouseEvent & { x: number; y: number };

    if (x <= window.innerWidth / 2 && y < window.innerHeight - 200) {
      swiper.slidePrev();
    } else if (x >= window.innerWidth / 2 && y < window.innerHeight - 200) {
      swiper.slideNext();
    }
  };

  return (
    <SwiperSlider
      cardsEffect={{ slideShadows: false }}
      className="d-flex"
      keyboard
      onClick={(swiper, e) => handleSlideChange(swiper, e)}
      modules={[Keyboard, Navigation, EffectCards]}
      navigation
      effect="cards"
    >
      {stories &&
        stories.map((story, storyIndex: number) => (
          <SwiperSlide key={storyIndex} id={username}>
            <Story
              key={storyIndex}
              story={story}
              username={username}
              imageURL={imageURL}
            />
          </SwiperSlide>
        ))}
    </SwiperSlider>
  );
};

export default InnerStorySwiper;
