import React, { useState } from 'react';

import ImageCropper from '../utils/ImageCropper';
import FileInput from './FileInput';

interface Props {
  imageRef: React.MutableRefObject<File | undefined>;
}

const ImageUploadInput = ({ imageRef }: Props) => {
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>('');

  const getBase64 = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <FileInput onChange={(e) => getBase64(e)} />
      {imageURL !== '' && (
        <ImageCropper imageRef={imageRef} imageURL={imageURL} />
      )}
    </div>
  );
};

export default ImageUploadInput;
