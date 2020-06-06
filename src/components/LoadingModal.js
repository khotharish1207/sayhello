import React from "react";
import { Modal, Spinner, Row } from "react-bootstrap";

function LoadingModal({ show }) {
  return (
    <Modal show={show} size="sm" centered>
      <Modal.Header>
        <Modal.Title>Loading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-md-center">
          <Spinner animation="grow" variant="primary" />
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;
