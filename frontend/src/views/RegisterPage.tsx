import React, { useState } from 'react';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

import CustomAlert from '../components/utils/CustomAlert';
import { USERS_ROUTE } from '../constants/apiRoutes';
import useTokenRedirect from '../hooks/useTokenRedirect';
import EmailInput from '../inputs/EmailInput';
import FileInput from '../inputs/FileInput';
import PasswordInput from '../inputs/PasswordInput';
import UsernameInput from '../inputs/UsernameInput';
import CenteredItems from '../styles/CenteredItems';

const RegisterPage = () => {
  useTokenRedirect();
  const [alert, setAlert] = useState<React.ReactNode>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    axios.post(USERS_ROUTE, formData).then((response) => {
      if (response.data.status !== 200) {
        setAlert(<CustomAlert variant="danger" text={response.data.message} />);
      } else {
        setAlert(
          <CustomAlert variant="success" text={response.data.message} />
        );
        setTimeout(() => {
          localStorage.setItem('token', response.data.token);
          window.location.href = '/';
        }, 1000);
      }
    });
  };

  return (
    <CenteredItems>
      <Form className="shadow-lg p-5" onSubmit={(e) => handleSubmit(e)}>
        <p className="fs-1">Register to Zysstragram</p>

        <EmailInput />
        <UsernameInput />
        <PasswordInput />
        <FileInput />

        <Button variant="primary" className="w-100" type="submit">
          Register
        </Button>
        {alert}
      </Form>
    </CenteredItems>
  );
};

export default RegisterPage;
