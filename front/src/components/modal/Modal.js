import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import './Modal.css';

const ModalComponent = (props) => {
  const {
    show,
    handleClose,
    onConfirm,
    title,
    onConfirmDisabled,
    onConfirmText,
    onCloseDisabled,
    onCloseText,
  } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Dialog className='my_modal_dialog'>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} disabled={onCloseDisabled}>
            {onCloseText || 'No'}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            className='btn btn-success'
            disabled={onConfirmDisabled}
          >
            {onConfirmText || 'Yes'}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ModalComponent;
