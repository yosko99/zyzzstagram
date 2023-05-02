import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Chat from '../components/chat/Chat';
import Sidebar from '../components/chat/ChatSidebar';
import MainNavigation from '../components/navigation/MainNavigation';
import { FirebaseAuthContext } from '../context/FirebaseAuthContext';

const MessagesPage = () => {
  const currentUser = useContext(FirebaseAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === undefined || currentUser === null) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="d-flex flex-lg-row flex-column">
      <MainNavigation />
      <div className="home w-100">
        <div className="chatContainer shadow-lg">
          {currentUser !== undefined && (
            <>
              <Sidebar />
              <Chat />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
