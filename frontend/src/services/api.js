import axios from 'axios';
import toast from 'react-hot-toast';

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

// INTERCEPTOR: trata respostas com 401 (token expirado/inválido) para melhorar UX
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    if (res) {
      // se 401: limpar token e redirecionar para login
      if (res.status === 401) {
        try { localStorage.removeItem('token'); } catch (e) {}
        toast.error(res.data?.error || 'Sessão expirada. Faça login novamente.');
        // pequeno atraso para o usuário ver a mensagem
        setTimeout(() => { window.location.href = '/login'; }, 600);
        return Promise.reject(res.data || { error: 'Unauthorized' });
      }
      // tratar 403
      if (res.status === 403) {
        toast.error(res.data?.error || 'Acesso negado');
        return Promise.reject(res.data || { error: 'Forbidden' });
      }
    } else {
      // sem resposta (network error)
      toast.error('Não foi possível conectar ao servidor.');
    }

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

// Setores
export const getSetores = () => api.get('/setores');
export const createSetor = (data) => api.post('/setores', data);
export const deleteSetor = (id) => api.delete(`/setores/${id}`);

// Movimentações
export const getMovimentacoes = () => api.get('/movimentacoes');
export const createMovimentacao = (data) => api.post('/movimentacoes', data);

// Funções futuras (adicione quando precisar)
export const getCurrentUser = () => api.get('/auth/me'); // exemplo para rota /me