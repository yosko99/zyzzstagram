import React, { ReactNode, createContext, useContext, useReducer } from 'react';

import { User } from 'firebase/auth';

import createCombinedChatId from '../functions/firebase/createCombinedChatId';
import { FirebaseAuthContext } from './FirebaseAuthContext';

interface State {
  user: User | undefined;
  chatId: string;
}

interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE: State = {
  user: undefined,
  chatId: 'null'
};

interface ContextProps {
  data: State;
  dispatch: React.Dispatch<Action>;
}

export const ChatContext = createContext<ContextProps>({
  data: INITIAL_STATE,
  dispatch: () => null
});

interface Props {
  children: ReactNode;
}

export const ChatContextProvider = ({ children }: Props) => {
  const currentUser = useContext(FirebaseAuthContext);

  const chatReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId: createCombinedChatId(currentUser!.uid, action.payload.uid)
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
