import React, { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import { CurrentUsernameContext } from './context/CurrentUsernameContext';
import { SocketContext } from './context/SocketContext';
import GlobalCSS from './styles/global.css';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import ProfilePage from './views/ProfilePage';
import RegisterPage from './views/RegisterPage';
import './styles/bootstrap.min.css';

const socket = io('ws://localhost:5000');

const App = () => {
  const [currentUsername, setCurrentUsername] = useState<string>('');

  return (
    <SocketContext.Provider value={socket}>
      <CurrentUsernameContext.Provider
        value={{ currentUsername, setCurrentUsername }}
      >
        <GlobalCSS />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </CurrentUsernameContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
