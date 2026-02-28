import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getMovimentacoes } from '../services/api';
import toast from 'react-hot-toast';

export default function MovimentacoesPage() {
  const [movs, setMovs] = useState([]);
  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    try {
      const mRes = await getMovimentacoes();
      setMovs(mRes.data);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar movimentações');
    }
  }

  return (
    <Container className="py-4">
      <h2>Movimentações</h2>

      {/* Page is read-only: movimentações are created from the item list */}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Usuário</th>
            <th>Origem</th>
            <th>Destino</th>
          </tr>
        </thead>
        <tbody>
          {movs.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.item_nome}</td>
              <td>{m.tipo}</td>
              <td>{m.quantidade}</td>
              <td>{new Date(m.data_hora).toLocaleString()}</td>
              <td>{m.usuario_nome}</td>
              <td>{m.setor_origem_nome || '-'}</td>
              <td>{m.setor_destino_nome || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
