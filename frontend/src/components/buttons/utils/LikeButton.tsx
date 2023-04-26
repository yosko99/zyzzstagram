/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface Props {
  useCustomLikeHook: { handleLike: () => Promise<void> };
  likedByUser: boolean;
  size?: string;
  fakeUpdate: boolean;
}

const LikeButton = ({
  likedByUser,
  useCustomLikeHook,
  size,
  fakeUpdate
}: Props) => {
  const { handleLike } = useCustomLikeHook;
  const [liked, setLiked] = useState(likedByUser);
  let status: boolean = likedByUser;

  const handleClick = () => {
    handleLike();

    if (fakeUpdate) {
      setLiked((prev) => !prev);
    }
  };

  status = fakeUpdate ? liked : likedByUser;

  return (
    <span onClick={() => handleClick()}>
      {!status ? (
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
