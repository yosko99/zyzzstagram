import React from 'react';

import { Form } from 'react-bootstrap';

const UsernameInput = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        className='border'
        required
        name="username"
        placeholder="Username"
        minLength={3}
      />
    </Form.Group>
  );
};

export default UsernameInput;
