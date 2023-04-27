/* eslint-disable multiline-ternary */
import React from 'react';

import { FaAngleDoubleDown } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

interface Props {
  isInModal: boolean;
}

const DropdownButton = ({ isInModal }: Props) => {
  const handleCloseModal = () => {
    const escKeyDownEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27
    });
    document.dispatchEvent(escKeyDownEvent);
  };

  return isInModal ? (
    <GrClose onClick={handleCloseModal} role={'button'} />
  ) : (
    <FaAngleDoubleDown role={'button'} />
  );
};

export default DropdownButton;
