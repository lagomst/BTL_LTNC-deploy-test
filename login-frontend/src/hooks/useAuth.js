import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useEffect, useNavigate } from 'react';

export function useAuth() {
  return useContext(AuthContext);
}

export function useRequireAuth(redirectUrl = '/login') {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      navigate(redirectUrl);
    }
  }, [navigate, redirectUrl]);

  return auth;
}