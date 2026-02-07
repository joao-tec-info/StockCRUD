import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteConfirmModal({
  show,
  onHide,
  onConfirm,
  itemName = "este item"
}) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        Tem certeza que deseja excluir  
        <strong> "{itemName}" </strong>?
        <br />
        <small className="text-danger">
          Esta ação não pode ser desfeita.
        </small>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}