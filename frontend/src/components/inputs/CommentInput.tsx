import React, { useContext, useState } from 'react';

import { useQueryClient } from 'react-query';

import { getCommentPostRoute } from '../../constants/apiRoutes';
import { SocketContext } from '../../context/SocketContext';
import { useMutationWithToken } from '../../hooks/useUploadImage';

interface Props {
  id: string;
  authorUsername: string;
  typeOfComment: 'post' | 'story';
}

const CommentInput = ({ id, typeOfComment, authorUsername }: Props) => {
  const link =
    typeOfComment === 'post'
      ? getCommentPostRoute(id)
      : getCommentPostRoute(id);

  const { mutate } = useMutationWithToken(link, false);
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);

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

  return (
    <div className="comment-wrapper">
      <input
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
