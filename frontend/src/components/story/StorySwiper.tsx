// import required modules
import React, { useEffect, useRef, useState } from 'react';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs';
import LoadingBar from 'react-top-loading-bar';
import Swiper, { EffectCoverflow } from 'swiper';
import { Swiper as SwiperSlider, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';

import IUser from '../../interfaces/IUser';
import Stories from './Stories';

interface Props {
  users: IUser[];
}

const StorySwiper = ({ users }: Props) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [slideChange, setSlideChange] = useState(false);

  const interval = useRef<number>();

  const onAutoplayTimeLeft = (s: unknown, time: number, progress: number) => {
    if (progress === 1 || time === 10000) {
      setLoadingProgress(0);
      clearInterval(interval.current);
      interval.current = window.setInterval(loadingProgressInterval, 1000);
    }
  };

  const loadingProgressInterval = () => {
    setLoadingProgress((prev) => prev + 20);
  };

  const handleMainSwiper = () => {
    setLoadingProgress(0);
    clearInterval(interval.current);
    interval.current = window.setInterval(loadingProgressInterval, 1000);
  };

  const [swiperRef, setSwiperRef] = useState<Swiper>();

  const handleSlideNext = () => {
    if (swiperRef!.activeIndex < users.length) {
      swiperRef!.slideTo(swiperRef!.activeIndex + 1);
    }
  };

  const handleSlidePrev = () => {
    if (swiperRef!.activeIndex > 0) {
      swiperRef!.slideTo(swiperRef!.activeIndex - 1);
    }
  };

  useEffect(() => {
    setSlideChange(false);
  }, [slideChange]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <BsFillArrowLeftCircleFill
        role="button"
        size={'15em'}
        className={`ps-5 ${swiperRef?.activeIndex === 0 && 'text-white'}`}
        onClick={handleSlidePrev}
      />
      <LoadingBar
        style={{ position: 'absolute' }}
        loaderSpeed={100}
        color="#007bff"
        height={5}
        progress={loadingProgress}
      />
      <SwiperSlider
        effect={'coverflow'}
        onSlideChangeTransitionStart={() => setSlideChange(true)}
        grabCursor={true}
        onSlideChange={handleMainSwiper}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        onInit={(e) => {
          // @ts-ignore
          setSwiperRef(e);
        }}
        modules={[EffectCoverflow]}
      >
        {users.map((user, index: number) => (
          <SwiperSlide key={index}>
            <Stories
              stories={user.stories!}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              username={user.username}
              imageURL={user.imageURL}
            />
          </SwiperSlide>
        ))}
      </SwiperSlider>
      <BsFillArrowRightCircleFill
        role="button"
        onClick={handleSlideNext}
        size={'15em'}
        className={`pe-5 ${
          swiperRef?.activeIndex === users.length - 1 && 'text-white'
        }`}
      />
    </div>
  );
};

export default StorySwiper;
