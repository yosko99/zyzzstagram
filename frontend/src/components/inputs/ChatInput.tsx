import React, { useContext, useState } from 'react';

import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { ChatContext } from '../../context/ChatContext';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase';

const ChatInput = () => {
  const [text, setText] = useState('');

  const currentUser = useContext(FirebaseAuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser!.uid,
        date: Timestamp.now()
      })
    });

    await updateDoc(doc(db, 'userChats', currentUser!.uid), {
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', data.user!.uid), {
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId + '.date']: serverTimestamp()
    });

    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
      setText('');
    }
  };

  return (
    <div className="input shadow">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        className={`comment-btn ${text.length === 0 ? 'd-none' : 'd-block'}`}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
