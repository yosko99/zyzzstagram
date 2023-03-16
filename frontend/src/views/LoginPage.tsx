import React, { useState } from 'react';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import CustomAlert from '../components/utils/CustomAlert';
import { LOGIN_ROUTE } from '../constants/apiRoutes';
import useAuth from '../hooks/useAuth';
import CenteredItems from '../styles/CenteredItems';
import ExtendedAxiosError from '../types/ExtendedAxiosError';

interface LoginDataType {
  email: string;
  password: string;
}

const LoginPage = () => {
  useAuth('/login');

  const [loginData, setLoginData] = useState<LoginDataType>({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState<React.ReactNode>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(LOGIN_ROUTE, { ...loginData })
      .then((response) => {
        setAlert(
          <CustomAlert variant="success" text={response.data.message} />
        );
        setTimeout(() => {
          localStorage.setItem('token', response.data.token);
          window.location.href = '/';
        }, 1000);
      })
      .catch((err) => {
        const { response } = err as ExtendedAxiosError;

        setAlert(<CustomAlert variant="danger" text={response.data.message} />);
      });
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setLoginData((prevState) => {
      return {
        ...prevState,
        [target.name]: target.value
      };
    });
  };

  return (
    <CenteredItems>
      <Form
        className="shadow-lg p-5"
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
      >
        <p className="fs-1">Login to Zysstagram</p>
        <EmailInput />
        <PasswordInput />

        <div className="d-flex justify-content-between">
          <Button variant="primary" className="me-2" type="submit">
            Login
          </Button>
          <Link to="/register">
            <Button variant="info">Register</Button>
          </Link>
        </div>
        {alert}
      </Form>
    </CenteredItems>
  );
};

export default LoginPage;
