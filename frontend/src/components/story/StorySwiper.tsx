// import required modules
import React, { useEffect, useRef, useState } from 'react';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Swiper, { EffectCoverflow } from 'swiper';
import { Swiper as SwiperSlider, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-creative';

import IUser from '../../interfaces/IUser';
import CloseStoriesButton from '../buttons/story/CloseStoriesButton';
import Stories from './Stories';

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

  useEffect(() => {
    setSlideChange(false);
  }, [slideChange]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <BsFillArrowLeftCircleFill
        role="button"
        size={'15em'}
        className={`ps-5 ${swiper?.activeIndex === 0 && 'text-white'}`}
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
        initialSlide={startIndex.current}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        onInit={(e) => {
          // @ts-ignore
          setSwiper(e);
        }}
        modules={[EffectCoverflow]}
      >
        {users.current.map((user, index: number) => (
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
      <CloseStoriesButton />
      <BsFillArrowRightCircleFill
        role="button"
        onClick={handleSlideNext}
        size={'15em'}
        className={`pe-5 ${
          swiper?.activeIndex === users.current.length - 1 && 'text-white'
        }`}
      />
    </div>
  );
};

export default StorySwiper;
