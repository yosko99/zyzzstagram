import React, { useContext, useState } from 'react';

import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase';
import initUserChats from '../../functions/initUserChats';
import sendMessage from '../../functions/sendMessage';

interface Props {
  receiverUsername: string;
  setIsSentReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoryInput = ({ receiverUsername, setIsSentReply }: Props) => {
  const currentUser = useContext(FirebaseAuthContext);
  const [message, setMessage] = useState('');

  const handlePressedEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createComment();
    }
  };

  const createComment = async () => {
    if (message.length > 0) {
      setMessage('');
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', receiverUsername)
      );
      const receiverUser = (await getDocs(q)).docs[0].data() as User;

      initUserChats(currentUser!, receiverUser!);
      sendMessage(currentUser!.uid, receiverUser.uid, message);
      setIsSentReply(true);
    }
  };

  return (
    <div className="comment-wrapper">
      <input
        maxLength={100}
        type="text"
        className="comment-box ms-3"
        placeholder={`Reply to ${receiverUsername}`}
        value={message}
        onKeyDown={(e) => handlePressedEnter(e)}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className={`comment-btn ${message.length === 0 ? 'd-none' : 'd-block'}`}
        onClick={createComment}
      >
        Post
      </button>
    </div>
  );
};

export default StoryInput;
