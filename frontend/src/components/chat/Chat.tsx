import React, { useContext } from 'react';

import { ChatContext } from '../../context/ChatContext';
import ChatInput from './ChatInput';
import Messages from './Messages';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="fs-4 text-center w-100">
          {data.user?.displayName!}
        </span>
      </div>
      <Messages />
      <ChatInput />
    </div>
  );
};

export default Chat;
