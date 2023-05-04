import React, { useEffect } from 'react';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CloseStoriesButton = () => {
  const navigate = useNavigate();

  const handleCloseStories = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate('/');
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleCloseStories);

    return () => {
      window.removeEventListener('keydown', handleCloseStories);
    };
  }, []);

  return (
    <AiOutlineCloseCircle
      role="button"
      onClick={() => navigate('/')}
      size={'3.5em'}
      style={{ position: 'absolute', top: 10, right: 20 }}
    />
  );
};

export default CloseStoriesButton;
