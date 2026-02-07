
import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { getItens } from '../services/api';  
import toast from 'react-hot-toast';

export default function StockListPage() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItens();
        setItens(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar itens:', err);
        setError('Não foi possível carregar os itens. Verifique se o backend está rodando.');
        toast.error('Erro ao carregar estoque');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando estoque...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Estoque Atual</h2>
        <Button variant="success" size="lg">
          + Novo Item
        </Button>
      </div>

      {itens.length === 0 ? (
        <Alert variant="info">
          Nenhum item cadastrado ainda. Clique em "Novo Item" para começar.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>
                  {Number(item.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    Editar
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}