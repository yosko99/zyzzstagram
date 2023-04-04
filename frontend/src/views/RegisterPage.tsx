import React, { useEffect } from 'react';

import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailInput from '../components/inputs/EmailInput';
import ImageUploadInput from '../components/inputs/ImageUploadInput';
import PasswordInput from '../components/inputs/PasswordInput';
import UsernameInput from '../components/inputs/UsernameInput';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { getUsersRoute } from '../constants/apiRoutes';
import useAuth from '../hooks/useAuth';
import { useUploadForm } from '../hooks/useUploadImage';
import CenteredItems from '../styles/CenteredItems';

const RegisterPage = () => {
  // useAuth('/register');

  const { setAlert, setImageFile, isLoading, imageFile, handleSubmit, alert } =
    useUploadForm(getUsersRoute(), '/', true);

  useEffect(() => {
    setAlert(null);
  }, [imageFile]);

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

        {alert}
        {isLoading && <LoadingSpinner />}

        <Button variant="primary" className="w-100 mt-3" type="submit">
          Register
        </Button>

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
