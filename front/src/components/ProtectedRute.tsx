import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { JSX } from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!user?.role || !allowedRoles.includes(user.role))) {
    // Si no tiene el rol requerido, redirigir a una página de acceso denegado o al home
    return <Navigate to="/students" replace />;
  }
  return children;
};
