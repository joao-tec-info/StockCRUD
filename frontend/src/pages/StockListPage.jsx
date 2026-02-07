// src/pages/StockListPage.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function StockListPage() {
  return (
    <div>
      <h2 className="mb-4">Lista de Itens em Estoque</h2>

      <div className="alert alert-info">
        Página de estoque carregada com sucesso!
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Teste de Renderização</Card.Title>
          <Card.Text>
            Se você está vendo este card, o componente StockListPage está funcionando corretamente.
          </Card.Text>
          <Button variant="primary">Testar Botão</Button>
        </Card.Body>
      </Card>
    </div>
  );
}