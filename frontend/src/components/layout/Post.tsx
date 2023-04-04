import React from 'react';

import { AiOutlineComment, AiOutlineSend } from 'react-icons/ai';
import { FaAngleDoubleDown, FaVoteYea } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';
import LikeButton from '../buttons/LikeButton';
import PostComments from '../post/PostComments';
import PostImage from '../post/PostImage';

interface Props {
  user: IUser;
  post: IPost;
  className?: string;
  showComments: boolean;
}

const Post = ({ user, post, className, showComments }: Props) => {
  const formattedDate = dateFormatter(new Date(post.createdAt));
  const navigate = useNavigate();

  return (
    <section className={`main ${className && className}`}>
      <div className="wrapper">
        <div className="left-col">
          <div className="post">
            <div className="info">
              <div className="user">
                <div className="profile-pic">
                  <Link to={`/profile/${user.username}`}>
                    <img
                      style={{ objectFit: 'cover' }}
                      src={PUBLIC_IMAGES_PREFIX + user.imageURL}
                      alt={user.username}
                    />
                  </Link>
                </div>
                <p
                  className="username"
                  role={'button'}
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  {user.username}{' '}
                  <span className="text-muted">{formattedDate}</span>
                </p>
              </div>
              <FaAngleDoubleDown role={'button'} />
            </div>
            <PostImage username={user.username} post={post} />
            <div className="post-content">
              <div className="reaction-wrapper d-flex fs-2 justify-content-between">
                <div>
                  <LikeButton post={post} />
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

              <PostComments post={post} showComments={showComments} />
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
