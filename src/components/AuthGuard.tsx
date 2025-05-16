import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react';

interface Props {
  children: JSX.Element;
  requireAuth: boolean;
}

const AuthGuard = ({ children, requireAuth }: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (requireAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && token) {
    return <Navigate to="/protected" replace />;
  }

  return children;
};

export default AuthGuard;