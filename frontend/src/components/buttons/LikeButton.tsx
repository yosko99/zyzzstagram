/* eslint-disable multiline-ternary */
import React from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface Props {
  useCustomLikeHook: { handleLike: () => Promise<void> };
  likedByUser: boolean;
}

const LikeButton = ({ likedByUser, useCustomLikeHook }: Props) => {
  const { handleLike } = useCustomLikeHook;

  return (
    <span onClick={() => handleLike()}>
      {!likedByUser ? (
        <AiOutlineHeart role={'button'} className="me-1" />
      ) : (
        <AiFillHeart color="red" role={'button'} className="me-1" />
      )}
    </span>
  );
};

export default LikeButton;
