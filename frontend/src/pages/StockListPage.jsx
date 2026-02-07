import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { getItens, createItem, deleteItem } from '../services/api';
import toast from 'react-hot-toast';
import ItemFormModal from '../components/stock/ItemFormModal';
import DeleteConfirmModal from '../components/stock/DeleteConfirmModal'; // ← novo import

export default function StockListPage() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal de cadastro
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    preco: ''
  });

  // Modal de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleCloseForm = () => {
    setShowFormModal(false);
    setFormData({ nome: '', quantidade: '', preco: '' });
  };

  const handleShowForm = () => setShowFormModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      toast.error('O nome é obrigatório');
      return;
    }
    if (!formData.quantidade || Number(formData.quantidade) < 0) {
      toast.error('Quantidade deve ser um número positivo');
      return;
    }
    if (!formData.preco || Number(formData.preco) < 0) {
      toast.error('Preço deve ser um número positivo');
      return;
    }

    try {
      const dataToSend = {
        nome: formData.nome.trim(),
        quantidade: Number(formData.quantidade),
        preco: Number(formData.preco)
      };

      const response = await createItem(dataToSend);
      setItens(prev => [...prev, response.data]);
      toast.success('Item cadastrado com sucesso!');
      handleCloseForm();
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      toast.error('Erro ao cadastrar o item');
    }
  };

  // Exclusão
  const handleShowDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteItem(itemToDelete.id);
      setItens(prev => prev.filter(i => i.id !== itemToDelete.id));
      toast.success('Item excluído com sucesso!');
      handleCloseDelete();
    } catch (err) {
      console.error('Erro ao excluir:', err);
      toast.error('Erro ao excluir o item');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItens();
        setItens(response.data);
        setLoading(false);
      } catch (err) {
        setError('Não foi possível carregar os itens.');
        toast.error('Erro ao carregar estoque');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Estoque Atual</h2>
        <Button variant="success" size="lg" onClick={handleShowForm}>
          + Novo Item
        </Button>
      </div>

      {itens.length === 0 ? (
        <Alert variant="info">Nenhum item cadastrado ainda.</Alert>
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
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    disabled 
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleShowDelete(item)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de cadastro */}
      <ItemFormModal
        show={showFormModal}
        onHide={handleCloseForm}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
      />

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.nome || ''}
      />
    </div>
  );
}