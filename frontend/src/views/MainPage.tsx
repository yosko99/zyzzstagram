import React from 'react';

import Navigation from '../components/layout/Navigation';
import useAuth from '../hooks/useAuth';
import MainPageTab from './tabs/MainPageTab';

const MainPage = () => {
  useAuth('/login');

  return (
    <div className="d-flex flex-lg-row flex-column">
      <Navigation />
      <MainPageTab />
    </div>
  );
};

export default MainPage;
