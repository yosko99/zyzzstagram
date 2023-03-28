import { useEffect } from 'react';

import { Socket } from 'socket.io-client';

const useOnConnectedSocket = (socket: Socket) => {
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', localStorage.getItem('token'));
    });
  }, []);
};

export default useOnConnectedSocket;
