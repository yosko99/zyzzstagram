import React, { useContext } from 'react';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';

const ChatNavbar = () => {
  const currentUser = useContext(FirebaseAuthContext);

  return (
    <div className="navbar">
      <span className="logo">Zyzzstagram Chat</span>
      <div className="user">
        <img src={PUBLIC_IMAGES_PREFIX + currentUser!.photoURL!} alt="" />
        <span>{currentUser!.displayName}</span>
      </div>
    </div>
  );
};

export default ChatNavbar;
