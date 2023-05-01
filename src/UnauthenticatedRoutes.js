import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from './Context/AuthContext';
export default function UnauthenticatedRoutes({ auth }) {
    const { currentUser } = useAuth();
  return !currentUser ? <Outlet /> : <Navigate to="/" />;
}
