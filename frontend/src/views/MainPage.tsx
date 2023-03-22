import React from 'react';

import Navigation from '../components/layout/Navigation';
import { NOTIFICATIONS_ROUTE } from '../constants/apiRoutes';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import MainPageTab from './tabs/MainPageTab';

const MainPage = () => {
  useAuth('/login');

  const { data } = useFetch('notifications', NOTIFICATIONS_ROUTE, true, true);

  return (
    <div className="d-flex flex-lg-row flex-column">
      <Navigation />
      <MainPageTab />
    </div>
  );
};

export default MainPage;
