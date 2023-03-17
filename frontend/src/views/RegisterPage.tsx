import React, { useState } from 'react';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailInput from '../components/inputs/EmailInput';
import ImageUploadInput from '../components/inputs/ImageUploadInput';
import PasswordInput from '../components/inputs/PasswordInput';
import UsernameInput from '../components/inputs/UsernameInput';
import CustomAlert from '../components/utils/CustomAlert';
import { USERS_ROUTE } from '../constants/apiRoutes';
import useAuth from '../hooks/useAuth';
import CenteredItems from '../styles/CenteredItems';
import ExtendedAxiosError from '../types/ExtendedAxiosError';

const RegisterPage = () => {
  useAuth('/register');
  const [alert, setAlert] = useState<React.ReactNode>();
  const [imageFile, setImageFile] = useState<File>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageFile === undefined) {
      setAlert(
        <CustomAlert variant="warning" text={'Please select a image'} />
      );
    } else {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set('image', imageFile);

      axios
        .post(USERS_ROUTE, formData)
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

          setAlert(
            <CustomAlert variant="danger" text={response.data.message} />
          );
        });
    }
  };

  return (
    <CenteredItems>
      <Form
        id="register-form"
        className="shadow-lg p-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p className="fs-1">Register to Zysstragram</p>

        <EmailInput />
        <UsernameInput />
        <PasswordInput />
        <ImageUploadInput setImageFile={setImageFile} />

        <Button variant="primary" className="w-100" type="submit">
          Register
        </Button>
        {alert}
        <p className="text-muted mt-3">
          Already have an account?{' '}
          <Link style={{ textDecoration: 'none' }} to="/login">
            <span role={'button'} className="text-info">
              Login here!
            </span>
          </Link>
        </p>
      </Form>
    </CenteredItems>
  );
};

export default RegisterPage;
