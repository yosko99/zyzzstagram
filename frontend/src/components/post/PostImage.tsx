/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Image } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import { BsHeartbreak } from 'react-icons/bs';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import useLikePost from '../../hooks/useLikePost';
import IPost from '../../interfaces/IPost';

interface Props {
  post: IPost;
  username: string;
}

const PostImage = ({ post, username }: Props) => {
  const [showHeart, setShowHeart] = useState(false);
  const { handleLike } = useLikePost(post);

  const handleDoubleClick = () => {
    handleLike();
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
          className="post-image"
          style={{
            filter: showHeart ? 'brightness(0.8)' : 'brightness(1)',
            transition: 'all 1s'
          }}
          alt={`${username} post`}
        />
        {showHeart && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span className="display-1" role="img" aria-label="heart">
              {!post.likedByUser ? (
                <BsHeartbreak color="white" />
              ) : (
                <AiFillHeart color="white" />
              )}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PostImage;
