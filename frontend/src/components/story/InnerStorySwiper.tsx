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
    const { x } = event as MouseEvent & { x: number };

    if (x <= window.innerWidth / 2) {
      swiper.slidePrev();
    } else {
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
      pagination={{ clickable: true }}
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
