import React, { useContext, useEffect } from 'react';

import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import error404 from '../assets/404.webp';
import { TokenContext } from '../context/TokenContext';
import CenteredItems from '../styles/CenteredItems';

const ErrorPage = () => {
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    token?.setToken(null);
  }, []);

  return (
    <CenteredItems flexColumn>
      <Image src={error404} />
      <p>Something went wrong :(</p>
      <Button onClick={() => navigate('/login')}>Go back</Button>
    </CenteredItems>
  );
};

export default ErrorPage;
