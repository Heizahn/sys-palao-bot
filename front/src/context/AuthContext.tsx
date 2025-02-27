import { useState, ReactNode, useEffect } from 'react';
import { User } from '../types/user';
import { AuthContext } from './ContextDefinition';
import { HOST_API } from '../../env';
import Loading from '../components/Loading';
import { Box } from '@chakra-ui/react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const authStatus = await isAuth();
        setIsAuthenticated(authStatus);
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(HOST_API + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();

      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.access_token);

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const isAuth = async () => {
    const token = localStorage.getItem('token') || '';

    const response = await fetch(HOST_API + '/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('token', data.access_token);

    return true;
  };

  if (isLoading) {
    return (
      <Box
        minH={'100vh'}
        minW={'100vw'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Loading />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
