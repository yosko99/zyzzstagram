import React, { useContext, useState } from 'react';

import { FirebaseAuthContext } from '../../context/FirebaseAuthContext';
import getFirebaseUser from '../../functions/firebase/getUser';
import initUserChats from '../../functions/firebase/initUserChats';
import sendMessage from '../../functions/firebase/sendMessage';

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
      const receiverUser = await getFirebaseUser(receiverUsername);

      initUserChats(currentUser!, receiverUser!);
      sendMessage(currentUser!.uid, receiverUser!.uid, message);
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
