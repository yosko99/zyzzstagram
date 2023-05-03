import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../firebase';
import createCombinedChatId from './createCombinedChatId';

const sendMessage = async (
  senderId: string,
  receiverId: string,
  text: string
) => {
  const chatId = createCombinedChatId(senderId, receiverId);

  await updateDoc(doc(db, 'chats', chatId), {
    messages: arrayUnion({
      id: uuid(),
      text,
      senderId,
      date: Timestamp.now()
    })
  });

  await updateDoc(doc(db, 'userChats', senderId), {
    [chatId + '.lastMessage']: {
      text
    },
    [chatId + '.date']: serverTimestamp()
  });

  await updateDoc(doc(db, 'userChats', receiverId), {
    [chatId + '.lastMessage']: {
      text
    },
    [chatId + '.date']: serverTimestamp()
  });
};

export default sendMessage;
