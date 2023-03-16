import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

type RedirectOptions = '/login' | '/register' | '/';

const useAuth = (redirectToURL: RedirectOptions) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      navigate('/');
    } else {
      navigate(redirectToURL);
    }
  }, []);
};

export default useAuth;
