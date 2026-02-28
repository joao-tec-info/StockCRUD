import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getSetores, createMovimentacao } from '../../services/api';
import toast from 'react-hot-toast';

export default function MovementModal({ show, onHide, item, onDone }) {
  const [setores, setSetores] = useState([]);
  const [form, setForm] = useState({ tipo: 'entrada', quantidade: 1, setor_origem: '', setor_destino: '' });

  useEffect(() => {
    if (show) fetchSetores();
    if (item) setForm(prev => ({ ...prev, quantidade: 1, setor_origem: item.setor_id || '' }));
  }, [show, item]);

  async function fetchSetores() {
    try {
      const res = await getSetores();
      setSetores(res.data);
    } catch (err) {
      console.error('Erro ao carregar setores', err);
      toast.error('Erro ao carregar setores');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item) return;
    if (!form.quantidade || Number(form.quantidade) <= 0) {
      toast.error('Quantidade deve ser maior que 0');
      return;
    }

    try {
      const payload = {
        item_id: item.id,
        tipo: form.tipo,
        quantidade: Number(form.quantidade),
        setor_origem: form.setor_origem || null,
        setor_destino: form.setor_destino || null
      };
      await createMovimentacao(payload);
      toast.success('Movimentação registrada');
      onDone && onDone();
      onHide();
    } catch (err) {
      console.error('Erro ao criar movimentação', err);
      toast.error(err.response?.data?.error || 'Erro ao criar movimentação');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Movimentação: {item?.nome || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
              <option value="transferencia">Transferência</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control type="number" name="quantidade" min={1} value={form.quantidade} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Setor destino (opcional)</Form.Label>
            <Form.Select name="setor_destino" value={form.setor_destino} onChange={handleChange}>
              <option value="">--</option>
              {setores.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>Cancelar</Button>
            <Button variant="primary" type="submit">Confirmar</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
