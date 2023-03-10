import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const useTokenRedirect = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      navigate('/');
    }
  }, []);
};

export default useTokenRedirect;
