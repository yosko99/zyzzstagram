import React from 'react';

import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSend
} from 'react-icons/ai';
import { FaAngleDoubleDown, FaVoteYea } from 'react-icons/fa';

import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';

interface Props {
  user: IUser;
  post: IPost;
}

const Post = ({ user, post }: Props) => {
  return (
    <section className="main">
      <div className="wrapper">
        <div className="left-col">
          <div className="post">
            <div className="info">
              <div className="user">
                <div className="profile-pic">
                  <img src={user.imageURL} alt={user.username} />
                </div>
                <p className="username">{user.username}</p>
              </div>
              <FaAngleDoubleDown role={'button'} />
            </div>
            <img
              src={post.imageURL}
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
              <p className="likes">{post.likedBy?.length} likes</p>
              <p className="description">
                <span>{user.username} </span> {post.description}
              </p>
            </div>
            <div className="comment-wrapper">
              <input
                type="text"
                className="comment-box ms-3"
                placeholder="Add a comment"
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
