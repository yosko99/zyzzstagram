import React, { useContext } from 'react';

import { useQueryClient } from 'react-query';

import { getUserFollowersRoute } from '../../constants/apiRoutes';
import { SocketContext } from '../../context/SocketContext';
import { useMutationWithToken } from '../../hooks/useUploadImage';

interface Props {
  isFollowedByRequester: boolean;
  username: string;
}

const FollowButton = ({ isFollowedByRequester, username }: Props) => {
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  const { mutate: follow } = useMutationWithToken(
    getUserFollowersRoute(username),
    false
  );
  const handleFollow = () => {
    follow(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          socket.emit('notification', username);
        }
      }
    );
  };

  return (
    <p
      role="button"
      className="bg-light m-0 rounded p-1"
      onClick={() => handleFollow()}
    >
      {isFollowedByRequester ? 'Following' : 'Follow'}
    </p>
  );
};

export default FollowButton;
