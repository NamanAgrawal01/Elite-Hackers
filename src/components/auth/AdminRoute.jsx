import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020409] font-display text-[#ff6b35]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
          <span className="tracking-widest">VERIFYING ADMIN KERNEL...</span>
        </div>
      </div>
    );
  }

  // If not logged in or not admin, redirect to dashboard or login
  if (!currentUser) return <Navigate to="/login" replace />;
  if (userData && !userData.isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;