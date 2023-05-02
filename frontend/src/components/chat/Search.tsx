import React, { useContext, useState } from 'react';

import { User } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase';
const ChatUserSearch = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [err, setErr] = useState(false);

  const currentUser = useContext(FirebaseAuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as User);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser!.uid > user!.uid
        ? currentUser!.uid + user!.uid
        : user!.uid + currentUser!.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser!.uid), {
          [combinedId + '.userInfo']: {
            uid: user!.uid,
            displayName: user!.displayName,
            photoURL: user!.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(db, 'userChats', user!.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });
      }
    } catch (err) {}

    setUser(undefined);
    setUsername('');
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={(e) => handleKey(e)}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={PUBLIC_IMAGES_PREFIX + user.photoURL!} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatUserSearch;
