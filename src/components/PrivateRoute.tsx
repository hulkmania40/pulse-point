import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useGlobalLogout } from '@/utils/useGlobalLogout';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: Array<'viewer' | 'editor' | 'admin'>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const logout = useGlobalLogout(); // ✅ use it like this
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error('Login to continue');
      hasShownToast.current = true;
      logout(); // ✅ this clears React context + navigates
    }
  }, [isAuthenticated, logout]);

  // User is logged in but unauthorized
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateRoute;
