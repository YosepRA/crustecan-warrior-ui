import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = function RequireAuthComponent({ children }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user.authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
