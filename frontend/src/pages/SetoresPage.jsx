import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { getSetores, createSetor, deleteSetor } from '../services/api';
import toast from 'react-hot-toast';

export default function SetoresPage() {
  const [setores, setSetores] = useState([]);
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSetores(); }, []);

  async function fetchSetores() {
    try {
      const res = await getSetores();
      setSetores(res.data);
    } catch (err) {
      console.error('Erro ao listar setores', err);
      toast.error('Erro ao carregar setores');
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return toast.error('Nome é obrigatório');
    try {
      const res = await createSetor({ nome: nome.trim() });
      setSetores(prev => [...prev, res.data]);
      setNome('');
      toast.success('Setor criado');
    } catch (err) {
      console.error('Erro ao criar setor', err);
      toast.error(err.response?.data?.error || 'Erro ao criar setor');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remover setor? Isso desvinculará itens deste setor.')) return;
    try {
      await deleteSetor(id);
      setSetores(prev => prev.filter(s => s.id !== id));
      toast.success('Setor removido');
    } catch (err) {
      console.error('Erro ao remover setor', err);
      toast.error(err.response?.data?.error || 'Erro ao remover setor');
    }
  };

  return (
    <Container className="py-4">
      <h2>Setores</h2>

      <Form onSubmit={handleCreate} className="mb-3">
        <Row className="g-2 align-items-center">
          <Col xs={8} md={6}>
            <InputGroup>
              <Form.Control placeholder="Nome do setor" value={nome} onChange={e => setNome(e.target.value)} />
              <Button variant="primary" type="submit">Criar</Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div>Carregando...</div>
      ) : setores.length === 0 ? (
        <div>Nenhum setor cadastrado.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {setores.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.nome}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(s.id)}>Remover</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
