import React, { useContext, useState } from 'react';

import { ChatContext } from '../../context/ChatContext';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import sendMessage from '../../functions/firebase/sendMessage';

const ChatInput = () => {
  const [text, setText] = useState('');

  const currentUser = useContext(FirebaseAuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = () => {
    sendMessage(currentUser!.uid, data.user!.uid, text);
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
