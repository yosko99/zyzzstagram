import React from 'react';

import { AiOutlineComment, AiOutlineSend } from 'react-icons/ai';
import { FaAngleDoubleDown, FaVoteYea } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import dateFormatter from '../../functions/dateFormatter';
import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';
import LikeButton from '../buttons/LikeButton';
import PostCommentInput from '../inputs/PostCommentInput';
import PostComments from '../post/PostComments';
import PostImage from '../post/PostImage';
import UserThumbnail from '../user/UserThumbnail';

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
            <UserThumbnail
              user={user}
              additionalElement={
                <span className="text-muted">{formattedDate}</span>
              }
              sideElement={<FaAngleDoubleDown role={'button'} />}
            />
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

            <PostCommentInput post={post} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
