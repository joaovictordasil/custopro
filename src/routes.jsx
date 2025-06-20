import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SelecionarCliente from './components/SelecionarCliente/SelecionarCliente';
import Dashboard from './components/dashboard/Dashboard';
import ResultadoLiqCentrosCustos from './components/ResultadoLiqCentrosCustos/ResultadoLiqCentrosCustos';
import MargemContribuicao from './components/MargemContribuicao/MargemContribuicao';
import ListaEmpresas from './components/Empresas/ListaEmpresas';
import VisualizarEmpresa from './components/Empresas/VisualizarEmpresa';
import NovaOuEditarEmpresa from './components/Empresas/NovaOuEditarEmpresa';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/selecionar-cliente" element={<SelecionarCliente />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resultado" element={<ResultadoLiqCentrosCustos />} />
      <Route path="/margem" element={<MargemContribuicao />} />
      <Route path="/empresas" element={<ListaEmpresas />} />
      <Route path="/empresas/nova" element={<NovaOuEditarEmpresa />} />
      <Route path="/empresas/editar/:id" element={<NovaOuEditarEmpresa />} />
      <Route path="/empresas/visualizar/:id" element={<VisualizarEmpresa />} />
    </Routes>
  );
};

export default AppRoutes;
