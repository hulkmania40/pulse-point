import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: Array<'viewer' | 'editor' | 'admin'>; // Optional role guard
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error('Login to continue');
      hasShownToast.current = true;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
