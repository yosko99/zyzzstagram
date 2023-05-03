import { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import { db } from '../firebase';
import createCombinedChatId from './createCombinedChatId';

const initUserChats = async (currentUser: User, receiverUser: User) => {
  const combinedId = createCombinedChatId(currentUser.uid, receiverUser.uid);

  const res = await getDoc(doc(db, 'chats', combinedId));

  if (!res.exists()) {
    await setDoc(doc(db, 'chats', combinedId), { messages: [] });

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [combinedId + '.userInfo']: {
        uid: receiverUser.uid,
        displayName: receiverUser.displayName,
        photoURL: receiverUser.photoURL
      },
      [combinedId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', receiverUser.uid), {
      [combinedId + '.userInfo']: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      },
      [combinedId + '.date']: serverTimestamp()
    });
  }
};

export default initUserChats;
