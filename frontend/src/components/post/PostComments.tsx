/* eslint-disable multiline-ternary */
import React from 'react';

import IPost from '../../interfaces/IPost';
import PostComment from './PostComment';
import PostModal from './PostModal';

interface Props {
  post: IPost;
  showComments: boolean;
}

const PostComments = ({ post, showComments }: Props) => {
  return (
    <>
      {showComments ? (
        <div style={{ maxHeight: '25vh', overflow: 'auto' }}>
          {post.comments?.map((comment, index: number) => (
            <PostComment post={post} comment={comment} key={index} />
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
