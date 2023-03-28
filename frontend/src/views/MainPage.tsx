import React, { useContext } from 'react';

import Navigation from '../components/layout/Navigation';
import { SocketContext } from '../context/SocketContext';
import useOnConnectedSocket from '../hooks/sockets/useOnConnectedSocket';
import useOnNotification from '../hooks/sockets/useOnNotification';
import useAuth from '../hooks/useAuth';
import MainPageTab from './tabs/MainPageTab';

const MainPage = () => {
  useAuth('/login');
  const socket = useContext(SocketContext);

  useOnConnectedSocket(socket);
  useOnNotification(socket);

  return (
    <div className="d-flex flex-lg-row flex-column">
      <Navigation />
      <MainPageTab />
    </div>
  );
};

export default MainPage;
