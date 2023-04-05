import React, { useState } from 'react';

import { Card } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import IPost from '../../interfaces/IPost';

interface Props {
  post: IPost;
}

const UserProfilePost = ({ post }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const style = {
    filter: isHovered ? 'brightness(0.85)' : 'brightness(1)'
  };

  return (
    <Card
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      role={'button'}
    >
      <Card.Img variant="top" src={PUBLIC_IMAGES_PREFIX + post.imageURL} />
      <div
        style={{
          visibility: isHovered ? 'visible' : 'hidden',
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundColor: 'black',
          transform: 'translate(-50%, -50%)',
          padding: '10px',
          color: 'white',
          display: 'flex'
        }}
      >
        <div className="d-flex me-3">
          <AiFillHeart className="fs-4" />
          <span className="ms-2">{post._count.likedBy}</span>
        </div>
        <div className="d-flex">
          <FaComment className="fs-4" />
          <span className="ms-2">{post._count.comments}</span>
        </div>
      </div>
    </Card>
  );
};

export default UserProfilePost;
