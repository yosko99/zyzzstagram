/* eslint-disable multiline-ternary */
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import IPost from '../../interfaces/IPost';
import LikeButton from '../buttons/LikeButton';
import PostModal from './PostModal';

interface Props {
  post: IPost;
  showComments: boolean;
}

const PostComments = ({ post, showComments }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {showComments ? (
        <div style={{ maxHeight: '25vh', overflow: 'auto' }}>
          {post.comments?.map((comment, index: number) => (
            <div className="info m-0 p-0" key={index}>
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
                    onClick={() =>
                      navigate(`/profile/${comment.author.username}`)
                    }
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
              <LikeButton post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted" role={'button'}>
          {post._count.comments === 0 ? (
            'Be the first one to comment!'
          ) : (
            <PostModal
              post={post}
              activateButtonElement={`View ${post._count.comments} ${
                post._count.comments === 1 ? 'comment' : 'comments'
              }`}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PostComments;
