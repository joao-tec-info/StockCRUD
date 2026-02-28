import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não tem token, redireciona para login
    return <Navigate to="/login" replace />;
  }

  // Se tem token, mostra o conteúdo protegido
  return children;
};

export default ProtectedRoute;