import React, { useContext, useEffect, useRef, useState } from 'react';

import { useQueryClient } from 'react-query';

import { getCommentPostRoute } from '../../constants/apiRoutes';
import { SocketContext } from '../../context/SocketContext';
import useMutationWithToken from '../../hooks/useMutationWithToken';

interface Props {
  id: string;
  authorUsername: string;
  typeOfComment: 'post' | 'story';
  commentFocus?: boolean;
  setCommentFocus?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({
  id,
  typeOfComment,
  authorUsername,
  setCommentFocus,
  commentFocus
}: Props) => {
  const mutationURL =
    typeOfComment === 'post'
      ? getCommentPostRoute(id)
      : getCommentPostRoute(id);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutationWithToken(mutationURL, false);
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  const [content, setContent] = useState('');

  const createComment = () => {
    if (content.length > 0) {
      setContent('');
      mutate(
        { content },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            queryClient.refetchQueries(`${typeOfComment}-${id}`);
            socket.emit('notification', authorUsername);
          }
        }
      );
    }
  };

  const handlePressedEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createComment();
    }
  };

  useEffect(() => {
    if (commentFocus !== undefined && setCommentFocus !== undefined) {
      inputRef.current?.focus();
      setCommentFocus(false);
    }
  }, [commentFocus]);

  return (
    <div className="comment-wrapper">
      <input
        ref={inputRef}
        autoFocus
        maxLength={100}
        type="text"
        className="comment-box ms-3"
        placeholder="Add a comment..."
        value={content}
        onKeyDown={(e) => handlePressedEnter(e)}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className={`comment-btn ${content.length === 0 ? 'd-none' : 'd-block'}`}
        onClick={createComment}
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
