import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ResponsePopupProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  message: string;
}

const ResponsePopup: React.FC<ResponsePopupProps> = ({
  show,
  handleClose,
  title,
  message,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResponsePopup;
