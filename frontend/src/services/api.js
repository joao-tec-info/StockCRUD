import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Buscar todos os itens
export const getItens = () => api.get('/itens');

// Criar novo item (POST)
export const createItem = (data) => api.post('/itens', data);

// Buscar item por ID, atualizar e deletar
export const getItemById = (id) => api.get(`/itens/${id}`);
export const updateItem = (id, data) => api.put(`/itens/${id}`, data);
export const deleteItem = (id) => api.delete(`/itens/${id}`);