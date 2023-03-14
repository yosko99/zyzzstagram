import React from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  onChange?: (event: any) => void;
}

const FileInput = ({ onChange }: Props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Image</Form.Label>
      <Form.Control
        type="file"
        name="image"
        required
        onChange={(e) => onChange && onChange(e)}
        className="form-control border"
        accept="image/jpeg,image/jpg,image/png"
      />
    </Form.Group>
  );
};

export default FileInput;
