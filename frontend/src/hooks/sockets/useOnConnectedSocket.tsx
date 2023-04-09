import { useEffect } from 'react';

import { Socket } from 'socket.io-client';

import useToken from '../useToken';

const useOnConnectedSocket = (socket: Socket) => {
  const { token } = useToken();

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', token);
    });
  }, []);
};

export default useOnConnectedSocket;
