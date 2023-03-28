import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';

import { SocketContext } from './context/SocketContext';
import { TokenContext } from './context/TokenContext';
import useToken from './hooks/useToken';
import GlobalCSS from './styles/global.css';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import ProfilePage from './views/ProfilePage';
import RegisterPage from './views/RegisterPage';
import './styles/bootstrap.min.css';
import UserPage from './views/UserPage';

const socket = io('ws://localhost:5000');

const App = () => {
  const { token, setToken } = useToken();

  return (
    <SocketContext.Provider value={socket}>
      <TokenContext.Provider value={{ token, setToken }}>
        <GlobalCSS />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:username" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </TokenContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
