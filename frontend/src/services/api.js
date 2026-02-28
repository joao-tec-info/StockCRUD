import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: adiciona o token automaticamente em TODAS as requisições protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções exportadas 
export const login = (credentials) => api.post('/auth/login', credentials);
export const getItens = () => api.get('/itens');
export const createItem = (data) => api.post('/itens', data);
export const getItemById = (id) => api.get(`/itens/${id}`);
export const updateItem = (id, data) => api.put(`/itens/${id}`, data);
export const deleteItem = (id) => api.delete(`/itens/${id}`);

// Funções futuras (adicione quando precisar)
export const getCurrentUser = () => api.get('/auth/me'); // exemplo para rota /me