import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Login from './components/Login/login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SelecionarCliente from './components/SelecionarCliente/SelecionarCliente';
import Dashboard from './components/dashboard/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/selecionar-cliente" element={<SelecionarCliente />} />
      
     <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
