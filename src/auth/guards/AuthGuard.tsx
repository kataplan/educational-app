'use client';

import { Box, CircularProgress } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import React, { FC, useState, useEffect, PropsWithChildren } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authToken, _setAuthToken] = useLocalStorage('authToken', '');
  const [user, _setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = (): void => {
      // Si no hay token o usuario, y no estamos en una ruta de auth, redirigir al login
      if (!authToken || !user) {
        if (!pathname?.startsWith('/auth/')) {
          router.push('/auth/login');
          return;
        }
      }

      // Si hay token y usuario, y estamos en una ruta de auth, redirigir al dashboard
      if (authToken && user && pathname?.startsWith('/auth/')) {
        router.push('/courses');
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router, authToken, user]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}

export default AuthGuard; 