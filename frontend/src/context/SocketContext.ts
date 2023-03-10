import { createContext } from 'react';

import { io, Socket } from 'socket.io-client';

const socket = io('ws://localhost:5000');

export const SocketContext = createContext<Socket>(socket);
