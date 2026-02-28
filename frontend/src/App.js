import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import StockListPage from './pages/StockListPage';
import MovimentacoesPage from './pages/MovimentacoesPage';
import SetoresPage from './pages/SetoresPage';
import Header from './components/layout/Header';
// Componente que protege rotas (só mostra se tiver token)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Se NÃO tiver token, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver token, mostra o conteúdo
  return children;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>

      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <Routes>
          {/* Se já estiver logado (tem token), vai direto para estoque */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <LoginPage />}
          />

          {/* Rota protegida principal: estoque */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Container className="py-4 flex-grow-1">
                  <StockListPage />
                </Container>
              </ProtectedRoute>
            }
          />

          <Route
            path="/movimentacoes"
            element={
              <ProtectedRoute>
                <Container className="py-4 flex-grow-1">
                  <MovimentacoesPage />
                </Container>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setores"
            element={
              <ProtectedRoute>
                <Container className="py-4 flex-grow-1">
                  <SetoresPage />
                </Container>
              </ProtectedRoute>
            }
          />

          {/* Qualquer outra URL → vai para login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;