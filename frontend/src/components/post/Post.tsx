import React from 'react';

import { AiOutlineComment, AiOutlineSend } from 'react-icons/ai';
import { FaAngleDoubleDown } from 'react-icons/fa';

import dateFormatter from '../../functions/dateFormatter';
import useLikePost from '../../hooks/useLikePost';
import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';
import BookmarkButton from '../buttons/BookmarkButton';
import LikeButton from '../buttons/LikeButton';
import PostCommentInput from '../inputs/PostCommentInput';
import UserThumbnail from '../user/UserThumbnail';
import CommentsPanel from './CommentsPanel';
import PostImage from './PostImage';
import PostModal from './PostModal';

interface Props {
  user: IUser;
  post: IPost;
  className?: string;
  showComments: boolean;
}

const Post = ({ user, post, className, showComments }: Props) => {
  const formattedDate = dateFormatter(new Date(post.createdAt));

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
                <div className="d-flex">
                  <LikeButton
                    likedByUser={post.likedByUser!}
                    useCustomLikeHook={useLikePost(post)}
                  />
                  <PostModal
                    post={post}
                    activateButtonElement={
                      <AiOutlineComment role={'button'} className="mx-1" />
                    }
                  />
                  <div>
                    <AiOutlineSend role={'button'} className="ms-1" />
                  </div>
                </div>
                <div>
                  <BookmarkButton
                    postId={post.id}
                    savedByUser={post.savedByUser!}
                  />
                </div>
              </div>
              <p className="likes">{post._count.likedBy} likes</p>
              <p className="description">
                <span>{user.username} </span> {post.description}
              </p>

              <CommentsPanel post={post} showComments={showComments} />
            </div>
            <PostCommentInput post={post} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;