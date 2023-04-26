// import required modules
import React, { useEffect, useRef, useState } from 'react';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Swiper, { EffectCoverflow, Keyboard } from 'swiper';
import { Swiper as SwiperSlider, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';

import IUser from '../../interfaces/IUser';
import CloseStoriesButton from '../buttons/story/CloseStoriesButton';
import InnerStorySwiper from './InnerStorySwiper';

const StorySwiper = () => {
  const [swiper, setSwiper] = useState<Swiper>();

  const location = useLocation();
  const navigate = useNavigate();

  const users = useRef<IUser[]>([]);
  useEffect(() => {
    if (location.state === null) {
      navigate('/404');
    }

    users.current = location.state.users;
  }, []);

  const startIndex = useRef(
    location.state !== null ? location.state.startIndex : 0
  );

  const handleSlideNext = () => {
    if (swiper!.activeIndex < users.current.length) {
      swiper!.slideTo(swiper!.activeIndex + 1);
    }
  };

  const handleSlidePrev = () => {
    if (swiper!.activeIndex > 0) {
      swiper!.slideTo(swiper!.activeIndex - 1);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <BsFillArrowLeftCircleFill
        role="button"
        size={'150px'}
        className={`ps-5 ${swiper?.activeIndex === 0 && 'text-white'}`}
        onClick={handleSlidePrev}
      />

      <SwiperSlider
        effect={'coverflow'}
        grabCursor={true}
        keyboard={{ pageUpDown: true }}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={startIndex.current}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 1000,
          modifier: 1,
          slideShadows: false
        }}
        onInit={(e) => {
          setSwiper(e);
        }}
        modules={[EffectCoverflow, Keyboard]}
      >
        {users.current.map((user, index: number) => (
          <SwiperSlide key={index}>
            <InnerStorySwiper
              stories={user.stories!}
              username={user.username}
              imageURL={user.imageURL}
            />
          </SwiperSlide>
        ))}
      </SwiperSlider>
      <CloseStoriesButton />
      <BsFillArrowRightCircleFill
        role="button"
        onClick={handleSlideNext}
        size={'150px'}
        className={`pe-5 ${
          swiper?.activeIndex === users.current.length - 1 && 'text-white'
        }`}
      />
    </div>
  );
};

export default StorySwiper;
