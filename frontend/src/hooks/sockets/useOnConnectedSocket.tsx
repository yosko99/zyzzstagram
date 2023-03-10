import { useContext, useEffect } from 'react';

import { SocketContext } from '../../context/SocketContext';

const useOnConnectedSocket = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', localStorage.getItem('token'));
    });
  }, []);
};

export default useOnConnectedSocket;
