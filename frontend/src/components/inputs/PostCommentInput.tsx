import React, { useContext, useState } from 'react';

import { useQueryClient } from 'react-query';

import { getCommentPostRoute } from '../../constants/apiRoutes';
import { SocketContext } from '../../context/SocketContext';
import { useMutationWithToken } from '../../hooks/useUploadImage';
import IPost from '../../interfaces/IPost';

interface Props {
  post: IPost;
}

const PostCommentInput = ({ post }: Props) => {
  const { mutate } = useMutationWithToken(getCommentPostRoute(post.id), false);
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
            queryClient.refetchQueries(`post-${post.id}`);
            socket.emit('notification', post.author.username);
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

export default PostCommentInput;
