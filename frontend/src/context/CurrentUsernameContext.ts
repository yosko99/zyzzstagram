import { createContext, Dispatch, SetStateAction } from 'react';

interface Context {
  currentUsername: string;
  setCurrentUsername: Dispatch<SetStateAction<string>>;
}

export const CurrentUsernameContext = createContext<Context>({
  currentUsername: '',
  setCurrentUsername: () => {}
});
