import React from 'react';

import MainNavigation from '../components/navigation/MainNavigation';
import useAuth from '../hooks/useAuth';
import MainPageTab from './tabs/MainPageTab';

const MainPage = () => {
  useAuth('/login');

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <MainPageTab />
    </div>
  );
};

export default MainPage;
