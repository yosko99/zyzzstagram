/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Image } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import { BsHeartbreak } from 'react-icons/bs';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import useLike from '../../hooks/useLike';
import IPost from '../../interfaces/IPost';

interface Props {
  post: IPost;
  username: string;
}

const PostImage = ({ post, username }: Props) => {
  const [showHeart, setShowHeart] = useState(false);
  const { handleLike } = useLike({
    id: post.id,
    authorUsername: post.author.username,
    typeOfLike: 'post'
  });

  const handleDoubleClick = () => {
    handleLike();
    post.likedByUser = !post.likedByUser;
    setTimeout(() => setShowHeart(true), 50);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          thumbnail
          onDoubleClick={handleDoubleClick}
          src={PUBLIC_IMAGES_PREFIX + post.imageURL}
          className="post-image shadow"
          style={{
            filter: showHeart ? 'brightness(0.5)' : 'brightness(1)',
            transition: 'all 1s'
          }}
          alt={`${username} post`}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span className="display-1" role="img">
            {!post.likedByUser ? (
              <BsHeartbreak
                className={showHeart ? 'animate__bounceIn' : 'd-none'}
                color="white"
              />
            ) : (
              <AiFillHeart
                className={showHeart ? 'animate__bounceIn' : 'd-none'}
                color="white"
              />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default PostImage;
