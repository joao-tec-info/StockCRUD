import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function ItemFormModal({
  show,
  onHide,
  onSubmit,
  formData,
  onChange,
  title = "Novo Item de Estoque",
  buttonText = "Salvar Item"
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome do item</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={onChange}
              placeholder="Ex: Mouse Gamer RGB"
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantidade">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={onChange}
              min="0"
              placeholder="Ex: 15"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="preco">
            <Form.Label>Preço (R$)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="preco"
              value={formData.preco}
              onChange={onChange}
              min="0"
              placeholder="Ex: 89.90"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {buttonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}