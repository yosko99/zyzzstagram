import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import UsernameInput from '../components/inputs/UsernameInput';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { getUsersRoute } from '../constants/apiRoutes';
import useAuth from '../hooks/useAuth';
import useAuthFormSubmit from '../hooks/useAuthFormSubmit';
import useFormUpdate from '../hooks/useFormUpdate';
import CenteredItems from '../styles/CenteredItems';

const RegisterPage = () => {
  useAuth('/register');
  const { alert, handleSubmit, isLoading } = useAuthFormSubmit(
    getUsersRoute(),
    'register'
  );
  const { formData, handleChange } = useFormUpdate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(formData);
  };

  return (
    <CenteredItems>
      <Form
        id="register-form"
        className="shadow-lg p-5"
        onChange={(e) => handleChange(e)}
        onSubmit={(e) => handleRegister(e)}
      >
        <p className="fs-1">Register to Zysstragram</p>

        <EmailInput />
        <UsernameInput />
        <PasswordInput />

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
        {alert}
        {isLoading && <LoadingSpinner />}
      </Form>
    </CenteredItems>
  );
};

export default RegisterPage;
