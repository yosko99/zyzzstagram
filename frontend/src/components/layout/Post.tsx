import React from 'react';

import { Image } from 'react-bootstrap';
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSend
} from 'react-icons/ai';
import { FaAngleDoubleDown, FaVoteYea } from 'react-icons/fa';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';

interface Props {
  user: IUser;
  post: IPost;
}

const Post = ({ user, post }: Props) => {
  const formattedDate = dateFormatter(new Date(post.createdAt));

  return (
    <section className="main">
      <div className="wrapper">
        <div className="left-col">
          <div className="post">
            <div className="info">
              <div className="user">
                <div className="profile-pic">
                  <img
                    style={{ objectFit: 'cover' }}
                    src={PUBLIC_IMAGES_PREFIX + user.imageURL}
                    alt={user.username}
                  />
                </div>
                <p className="username">
                  {user.username}{' '}
                  <span className="text-muted">{formattedDate}</span>
                </p>
              </div>
              <FaAngleDoubleDown role={'button'} />
            </div>
            <Image
              src={PUBLIC_IMAGES_PREFIX + post.imageURL}
              className="post-image"
              alt={`${user.username} post`}
            />
            <div className="post-content">
              <div className="reaction-wrapper d-flex fs-2 justify-content-between">
                <div>
                  <AiOutlineHeart role={'button'} className="me-1" />
                  <AiOutlineComment role={'button'} className="mx-1" />
                  <AiOutlineSend role={'button'} className="ms-1" />
                </div>
                <div>
                  <FaVoteYea role={'button'} />
                </div>
              </div>
              <p className="likes">{post._count.likedBy} likes</p>
              <p className="description">
                <span>{user.username} </span> {post.description}
              </p>

              <p className="text-muted" role={'button'}>
                {post._count.comments === 0
                  ? 'Be the first one to comment!'
                  : `View all ${post._count.comments} comments`}
              </p>
            </div>
            <div className="comment-wrapper">
              <input
                type="text"
                className="comment-box ms-3"
                placeholder="Add a comment..."
              />

              <button className="comment-btn">post</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
