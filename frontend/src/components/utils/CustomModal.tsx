import React, { useState, FC } from 'react';

import { Modal } from 'react-bootstrap';

interface Props {
  activateButtonElement: string | React.ReactNode;
  activateButtonClassName?: string;
  activateButtonOnClick?: () => void;
  modalHeader: React.ReactNode;
  modalBody: React.ReactNode;
}

const CustomModal: FC<Props> = ({
  activateButtonElement,
  activateButtonClassName,
  activateButtonOnClick,
  modalHeader,
  modalBody
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleButtonClick = () => {
    handleShow();
    activateButtonOnClick && activateButtonOnClick();
  };

  return (
    <>
      <p
        role={'button'}
        className={activateButtonClassName}
        onClick={handleButtonClick}
      >
        {activateButtonElement}
      </p>

      <Modal centered animation show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100">
            <>{modalHeader}</>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>{modalBody}</>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
