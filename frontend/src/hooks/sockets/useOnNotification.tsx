import { useEffect } from 'react';

import { useQueryClient } from 'react-query';
import { Socket } from 'socket.io-client';

const useOnNotification = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on(`notification-${socket.id}`, () => {
        queryClient.resetQueries({ queryKey: 'notifications' });
      });
    });
  }, []);
};

export default useOnNotification;
