/* eslint-disable multiline-ternary */
import React from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface Props {
  useCustomLikeHook: { handleLike: () => Promise<void> };
  likedByUser: boolean;
  size?: string;
}

const LikeButton = ({ likedByUser, useCustomLikeHook, size }: Props) => {
  const { handleLike } = useCustomLikeHook;

  return (
    <span onClick={() => handleLike()}>
      {!likedByUser ? (
        <AiOutlineHeart role={'button'} size={size && size} className="me-1" />
      ) : (
        <AiFillHeart
          color="red"
          size={size && size}
          role={'button'}
          className="me-1"
        />
      )}
    </span>
  );
};

export default LikeButton;
