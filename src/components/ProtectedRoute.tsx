import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string; // Caminho para redirecionar caso não esteja autenticado
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/',
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    // Redireciona para a página definida em `redirectTo` se não estiver autenticado
    return <Navigate to={redirectTo} replace />;
  }

  // Renderiza os filhos (children) se o usuário estiver autenticado
  return <>{children}</>;
};

export default ProtectedRoute;
