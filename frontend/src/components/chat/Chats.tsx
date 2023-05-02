import React, { useContext, useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import { ChatContext } from '../../context/ChatContext';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase';

interface UserInfo {
  imageURL: string;
  displayName: string;
  photoURL: string;
}

interface Chat {
  date: Date;
  userInfo: UserInfo;
  lastMessage: {
    text: string;
  };
}

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const currentUser = useContext(FirebaseAuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser!.uid),
        (doc) => {
          setChats(doc.data() as Chat[]);
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser!.uid && getChats();
  }, [currentUser!.uid]);

  const handleSelect = (u: UserInfo) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        // ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={PUBLIC_IMAGES_PREFIX + chat[1].userInfo.photoURL}
              alt=""
            />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
