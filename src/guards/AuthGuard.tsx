'use client';

import { Box, CircularProgress } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { FC, useState, useEffect, PropsWithChildren } from 'react';


const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');

      // Si no hay token o usuario, y no estamos en una ruta de auth, redirigir al login
      if (!token || !user) {
        if (!pathname?.startsWith('/auth/')) {
          router.push('/auth/login');
          return;
        }
      }

      // Si hay token y usuario, y estamos en una ruta de auth, redirigir al dashboard
      if (token && user && pathname?.startsWith('/auth/')) {
        router.push('/courses');
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

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