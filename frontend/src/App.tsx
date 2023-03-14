import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import { SocketContext } from './context/SocketContext';
import GlobalCSS from './styles/global.css';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';
import './styles/bootstrap.min.css';

const socket = io('ws://localhost:5000');

const App = () => {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <GlobalCSS />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </SocketContext.Provider>
    </BrowserRouter>
  );
};

export default App;
