/* eslint-disable multiline-ternary */
import React from 'react';

import { MdOutlineBookmark, MdOutlineBookmarkBorder } from 'react-icons/md';
import { useQueryClient } from 'react-query';

import { getPostSavedByRoute } from '../../../constants/apiRoutes';
import useMutationWithToken from '../../../hooks/useMutationWithToken';

interface Props {
  savedByUser: boolean;
  postId: string;
}

const BookmarkButton = ({ savedByUser, postId }: Props) => {
  const { mutate } = useMutationWithToken(getPostSavedByRoute(postId), false);
  const queryClient = useQueryClient();

  const handleSavePost = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          savedByUser = !savedByUser;
          queryClient.refetchQueries({ queryKey: `post-${postId}` });
          queryClient.invalidateQueries({ queryKey: 'posts' });
          queryClient.invalidateQueries({ queryKey: 'saved-posts' });
        }
      }
    );
  };

  return savedByUser ? (
    <MdOutlineBookmark onClick={handleSavePost} role="button" />
  ) : (
    <MdOutlineBookmarkBorder onClick={handleSavePost} role="button" />
  );
};

export default BookmarkButton;
