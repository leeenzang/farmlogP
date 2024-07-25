import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // 올바른 경로로 수정

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext); // AuthContext 사용

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;