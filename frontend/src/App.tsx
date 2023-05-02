import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';

import { ChatContextProvider } from './context/ChatContext';
import { FirebaseAuthContextProvider } from './context/FirebaseAuthContext';
import { SocketContext } from './context/SocketContext';
import { TokenContext } from './context/TokenContext';
import useOnConnectedSocket from './hooks/sockets/useOnConnectedSocket';
import useOnNotification from './hooks/sockets/useOnNotification';
import useToken from './hooks/useToken';
import GlobalCSS from './styles/global.css';
import ErrorPage from './views/ErrorPage';
import ExplorePage from './views/ExplorePage';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import MessagesPage from './views/MessagesPage';
import PostPage from './views/PostPage';
import ProfilePage from './views/ProfilePage';
import RegisterPage from './views/RegisterPage';
import './styles/bootstrap.min.css';
import StoriesPage from './views/StoriesPage';

const socket = io('ws://localhost:5000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity
});

const App = () => {
  const { token, setToken } = useToken();

  useOnConnectedSocket(socket);
  useOnNotification(socket);

  return (
    <FirebaseAuthContextProvider>
      <ChatContextProvider>
        <SocketContext.Provider value={socket}>
          <TokenContext.Provider value={{ token, setToken }}>
            <GlobalCSS />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </TokenContext.Provider>
        </SocketContext.Provider>
      </ChatContextProvider>
    </FirebaseAuthContextProvider>
  );
};

export default App;
