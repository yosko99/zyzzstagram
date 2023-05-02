/* eslint-disable operator-linebreak */
import React, { useContext, useEffect, useRef } from 'react';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import { ChatContext } from '../../context/ChatContext';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import dateFormatter from '../../functions/dateFormatter';
import IMessage from '../../interfaces/IMessage';

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props) => {
  const currentUser = useContext(FirebaseAuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser!.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser!.uid
              ? PUBLIC_IMAGES_PREFIX + currentUser!.photoURL!
              : PUBLIC_IMAGES_PREFIX + data.user!.photoURL!
          }
        />
        <span>{dateFormatter(new Date(message.date.seconds * 1000))}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
