/* eslint-disable multiline-ternary */
import React, { useContext, useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';

import { getUserFollowersRoute } from '../../../constants/apiRoutes';
import { SocketContext } from '../../../context/SocketContext';
import useMutationWithToken from '../../../hooks/useMutationWithToken';

interface Props {
  isFollowedByRequester: boolean;
  username: string;
}

const FollowButton = ({ isFollowedByRequester, username }: Props) => {
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(
    isFollowedByRequester ? 'Following' : 'Follow'
  );

  const { mutate: follow, isLoading } = useMutationWithToken(
    getUserFollowersRoute(username),
    false
  );
  const handleFollow = () => {
    follow(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          queryClient.refetchQueries();
          socket.emit('notification', username);
        }
      }
    );
  };

  useEffect(() => {
    setStatus(isFollowedByRequester ? 'Following' : 'Follow');
  }, [isFollowedByRequester]);

  return (
    <p
      role="button"
      className={`m-0 rounded p-1 btn ${
        isFollowedByRequester ? 'btn-outline-primary' : 'btn-info'
      }`}
      onClick={() => handleFollow()}
    >
      {status}
    </p>
  );
};

export default FollowButton;
