/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { AiOutlineComment, AiOutlineSend } from 'react-icons/ai';

import dateFormatter from '../../functions/dateFormatter';
import useLike from '../../hooks/useLike';
import IPost from '../../interfaces/IPost';
import IUser from '../../interfaces/IUser';
import BookmarkButton from '../buttons/post/BookmarkButton';
import DropdownButton from '../buttons/post/DropdownButton';
import LikeButton from '../buttons/utils/LikeButton';
import CommentInput from '../inputs/CommentInput';
import UserThumbnail from '../user/UserThumbnail';
import CommentsPanel from './CommentsPanel';
import PostImage from './PostImage';
import PostModal from './PostModal';

interface Props {
  user: IUser;
  post: IPost;
  isInModal: boolean;
  className?: string;
  showComments: boolean;
}

const Post = ({ user, post, className, showComments, isInModal }: Props) => {
  const [isCommentInputFocused, setCommentInputFocus] = useState(false);

  return (
    <section className={`main ${className && className}`}>
      <div className="wrapper">
        <div className="left-col">
          <div className="post">
            <UserThumbnail
              username={user.username}
              imageURL={user.imageURL}
              additionalElement={
                <span className="text-muted">
                  {dateFormatter(new Date(post.createdAt))}
                </span>
              }
              sideElement={<DropdownButton isInModal={isInModal} />}
            />
            <PostImage username={user.username} post={post} />
            <div className="post-content">
              <div className="reaction-wrapper d-flex fs-2 justify-content-between">
                <div className="d-flex">
                  <LikeButton
                    fakeUpdate={false}
                    likedByUser={post.likedByUser!}
                    useCustomLikeHook={useLike({
                      id: post.id,
                      authorUsername: post.author.username,
                      typeOfLike: 'post'
                    })}
                  />
                  {!isInModal ? (
                    <PostModal
                      post={post}
                      activateButtonElement={
                        <AiOutlineComment role={'button'} className="mx-3" />
                      }
                    />
                  ) : (
                    <div>
                      <AiOutlineComment
                        onClick={() => setCommentInputFocus(true)}
                        role={'button'}
                        className="mx-3"
                      />
                    </div>
                  )}
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
              commentFocus={isCommentInputFocused}
              setCommentFocus={setCommentInputFocus}
              authorUsername={post.author.username}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
