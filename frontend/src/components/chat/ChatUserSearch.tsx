import React, { useContext, useState } from 'react';

import { User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import { ChatContext } from '../../context/ChatContext';
import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase';
import initUserChats from '../../functions/initUserChats';

const ChatUserSearch = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const { dispatch } = useContext(ChatContext);

  const currentUser = useContext(FirebaseAuthContext);

  const handleSearch = async () => {
    setIsSearching(true);
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0]?.data() !== undefined) {
        setUser(querySnapshot.docs[0].data() as User);
        setIsSearching(false);
      } else {
        setUser(undefined);
      }
    } catch (err) {}
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    try {
      await initUserChats(currentUser!, user!);
    } catch (err) {}

    dispatch({ type: 'CHANGE_USER', payload: user });
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
      {isSearching && !user && (
        <p className="text-center w-100 my-2">User not found!</p>
      )}
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
