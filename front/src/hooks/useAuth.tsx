import { useContext } from 'react';

import { AuthContext } from '../context/ContextDefinition';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth solo puede ser usado dentro de un AuthProvider');
  }

  return context;
};
