import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import useLikeComment from '../../hooks/useLikeComment';
import IComment from '../../interfaces/IComment';
import IPost from '../../interfaces/IPost';
import LikeButton from '../buttons/LikeButton';

interface Props {
  comment: IComment;
  post: IPost;
}

const PostComment = ({ comment, post }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="info m-0 p-0">
      <div className="user">
        <div className="profile-pic">
          <Link to={`/profile/${comment.author.username}`}>
            <img
              style={{ objectFit: 'cover' }}
              src={PUBLIC_IMAGES_PREFIX + comment.author.imageURL}
              alt={comment.author.username}
            />
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column ms-2 text-left w-100">
        <div className="d-flex">
          <p
            className="username m-0"
            role={'button'}
            style={{ textAlign: 'left' }}
            onClick={() => navigate(`/profile/${comment.author.username}`)}
          >
            {comment.author.username}
            <span className="ms-2">{comment.content}</span>
          </p>
        </div>
        <div style={{ fontSize: '0.6em' }} className="mt-1">
          <span>{dateFormatter(new Date(comment.createdAt))}</span>
          {}
          <span className="ms-2">{comment._count.likedBy} likes</span>
          <span className="ms-2" role="button">
            Reply
          </span>
        </div>
      </div>
      <LikeButton
        likedByUser={comment.likedByUser!}
        useCustomLikeHook={useLikeComment(post, comment)}
      />
    </div>
  );
};

export default PostComment;
