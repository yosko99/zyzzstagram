import React, { useState } from 'react';

type FormData = {
  [key: string]: string;
};

const useFormUpdate = () => {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setFormData((prevState) => {
      return {
        ...prevState,
        [target.name]: target.value
      };
    });
  };

  return {
    formData,
    handleChange
  };
};

export default useFormUpdate;
