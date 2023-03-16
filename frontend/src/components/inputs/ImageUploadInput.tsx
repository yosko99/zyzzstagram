import React, { useState } from 'react';

import { Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { BsCardImage } from 'react-icons/bs';

import CustomAlert from '../utils/CustomAlert';
import ImageCropper from '../utils/ImageCropper';

interface Props {
  imageRef: React.MutableRefObject<File | undefined>;
}

const ImageUploadInput = ({ imageRef }: Props) => {
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>('');
  const [alert, setAlert] = useState<React.ReactNode>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: (files) => {
      if (files.length === 0) {
        setAlert(
          <CustomAlert
            text="Multiple files or invalid file format provided!"
            variant="danger"
          />
        );
      } else {
        setAlert(null);

        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          setImageURL(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  return (
    <div>
      {imageURL !== '' && (
        <ImageCropper imageRef={imageRef} imageURL={imageURL} />
      )}

      <section className="container" id="drag-me-container">
        <div role={'button'} {...getRootProps({ className: 'dropzone py-3' })}>
          <input {...getInputProps()} />
          <p role={'button'}>
            Click me or drag and drop an image here.{' '}
            <BsCardImage className="fs-4 ms-1" />
          </p>
        </div>
      </section>
      <div
        id="thumbnail-container"
        className="d-none justify-content-center align-items-center mb-4"
      >
        <Image
          fluid
          id="thumbnail"
          style={{ objectFit: 'cover', width: '100%', height: '250px' }}
        />
      </div>
      {alert}
    </div>
  );
};

export default ImageUploadInput;
