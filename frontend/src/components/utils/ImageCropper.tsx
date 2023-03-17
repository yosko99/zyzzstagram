import React, { useEffect, useState, useCallback, useRef } from 'react';

import { Button, Modal } from 'react-bootstrap';
import Cropper from 'react-easy-crop';

import toggleThumbnail from '../../functions/toggleThumbnail';

interface Props {
  imageURL: string | ArrayBuffer | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

interface ICroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageCropper = ({ imageURL, setImageFile }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const croppedImageBase64 = useRef('');

  const croppedAreaPixelsRef = useRef<ICroppedArea>();

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: ICroppedArea) => {
      croppedAreaPixelsRef.current = croppedAreaPixels;
    },
    []
  );

  const drawCroppedImageToHiddenCanvas = (croppedAreaPixels: ICroppedArea) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas!.getContext('2d');

    const img = new Image();

    img.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx!.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      croppedImageBase64.current = canvas.toDataURL();
      createFileFromBase64(croppedImageBase64);
      toggleThumbnail(canvas);
    };
    img.src = imageURL as string;
  };

  const createFileFromBase64 = (
    croppedImageBase64: React.MutableRefObject<string>
  ) => {
    fetch(croppedImageBase64.current)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'File name.jpg', { type: 'image/jpeg' });

        setImageFile(file);
      });
  };

  const handleCloseModal = () => {
    drawCroppedImageToHiddenCanvas(croppedAreaPixelsRef.current!);
    setModalShow(false);
  };

  useEffect(() => {
    setModalShow(true);
  }, [imageURL]);

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-flex">
        <Modal.Title id="contained-modal-title-vcenter">
          Upload your photo
        </Modal.Title>
        <Button variant="success" onClick={() => handleCloseModal()}>
          Done
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Cropper
          image={imageURL as string}
          crop={crop}
          zoom={zoom}
          style={{
            containerStyle: { height: '50vh', backgroundColor: 'white' }
          }}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageCropper;
