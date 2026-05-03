import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
