import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';     
import StockListPage from './pages/StockListPage';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <Routes>
          {/* Rota pública: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas */}
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

          {/* Redireciona qualquer outra URL para login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;