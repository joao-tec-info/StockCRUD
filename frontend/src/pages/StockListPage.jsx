import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { getItens, createItem, updateItem, deleteItem } from '../services/api';
import toast from 'react-hot-toast';
import ItemFormModal from '../components/stock/ItemFormModal';
import DeleteConfirmModal from '../components/stock/DeleteConfirmModal';

export default function StockListPage() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal de formulário (usado tanto para criar quanto para editar)
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    preco: '',
    minimo: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Modal de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleCloseForm = () => {
    setShowFormModal(false);
    setFormData({ nome: '', quantidade: '', preco: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleShowCreate = () => {
    setIsEditing(false);
    setFormData({ nome: '', quantidade: '', preco: '', minimo: '' });
    setShowFormModal(true);
  };

  const handleShowEdit = (item) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormData({
      nome: item.nome,
      quantidade: item.quantidade.toString(),
      preco: item.preco.toString(),
      minimo: (item.minimo ?? 0).toString()
    });
    setShowFormModal(true);
  };

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
    if (formData.minimo === '' || Number(formData.minimo) < 0) {
      toast.error('Quantidade mínima deve ser um número (>= 0)');
      return;
    }

    try {
      const dataToSend = {
        nome: formData.nome.trim(),
        quantidade: Number(formData.quantidade),
        preco: Number(formData.preco),
        minimo: Number(formData.minimo)
      };

      let response;

      if (isEditing) {
        // Atualização
        response = await updateItem(editingId, dataToSend);
        setItens(prev =>
          prev.map(i => (i.id === editingId ? response.data : i))
        );
        toast.success('Item atualizado com sucesso!');
      } else {
        // Criação
        response = await createItem(dataToSend);
        setItens(prev => [...prev, response.data]);
        toast.success('Item cadastrado com sucesso!');
      }

      handleCloseForm();
    } catch (err) {
      console.error('Erro ao salvar:', err);
      toast.error('Erro ao salvar o item');
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
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2 className="mb-0">Estoque Atual</h2>
        <Button variant="success" size="lg" onClick={handleShowCreate}>
          + Novo Item
        </Button>
      </div>

      {itens.length === 0 ? (
        <Alert variant="info">Nenhum item cadastrado ainda.</Alert>
      ) : (
        <>
          <div className="mb-3">
            <small>
              <span className="badge bg-danger me-2">Baixo</span>
              <span className="badge bg-warning text-dark me-2">Atenção</span>
              <span className="badge bg-success">OK</span>
              <span className="ms-2 text-muted">(Linhas coloridas mostram o status comparando quantidade com o mínimo)</span>
            </small>
          </div>
          <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Minimo</th>
              <th>Preço (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
                  <tr key={item.id} className={
                    item.minimo != null && Number(item.quantidade) <= Number(item.minimo)
                      ? 'table-danger'
                      : (item.minimo != null && Number(item.quantidade) <= Number(item.minimo) * 1.5 ? 'table-warning' : '')
                  }>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.minimo ?? '-'}</td>
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
                    onClick={() => handleShowEdit(item)}
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
        </>
      )}

      {/* Modal de cadastro / edição */}
      <ItemFormModal
        show={showFormModal}
        onHide={handleCloseForm}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        title={isEditing ? "Editar Item" : "Novo Item de Estoque"}
        buttonText={isEditing ? "Atualizar" : "Salvar Item"}
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