import React from 'react';

import { AiOutlineComment, AiOutlineSend } from 'react-icons/ai';
import { FaAngleDoubleDown } from 'react-icons/fa';

import dateFormatter from '../../functions/dateFormatter';
import useLikePost from '../../hooks/useLikePost';
import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';
import BookmarkButton from '../buttons/post/BookmarkButton';
import LikeButton from '../buttons/utils/LikeButton';
import CommentInput from '../inputs/CommentInput';
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
              username={user.username}
              imageURL={user.imageURL}
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
                      <AiOutlineComment role={'button'} className="mx-3" />
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
            <CommentInput
              typeOfComment="post"
              id={post.id}
              authorUsername={post.author.username}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
