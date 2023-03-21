/* eslint-disable multiline-ternary */
import React from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import useLikePost from '../../hooks/useLikePost';
import IPost from '../../interfaces/IPost';

interface Props {
  post: IPost;
}

const LikeButton = ({ post }: Props) => {
  const { handleLike } = useLikePost(post);

  return (
    <span onClick={() => handleLike()}>
      {!post.likedByUser ? (
        <AiOutlineHeart role={'button'} className="me-1" />
      ) : (
        <AiFillHeart color="red" role={'button'} className="me-1" />
      )}
    </span>
  );
};

export default LikeButton;
