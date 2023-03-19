import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateChecker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state.username;

  useEffect(() => {
    if (username === '' || username === undefined) {
      navigate('/login');
    }
  }, []);

  return { username };
};

export default useNavigateChecker;
