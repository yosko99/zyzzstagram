import React from 'react';

import { AnimatedPage } from '../animations/AnimatedPage';
import MainNavigation from '../components/navigation/MainNavigation';
import SuggestionPanel from '../components/suggestion/SuggestionPanel';
import useAuth from '../hooks/useAuth';
import MainPageTab from './tabs/MainPageTab';

const MainPage = () => {
  useAuth('/login');

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <div className="d-flex w-100 justify-content-center mb-5">
        <AnimatedPage>
          <MainPageTab />
        </AnimatedPage>
        <SuggestionPanel />
      </div>
    </div>
  );
};

export default MainPage;
