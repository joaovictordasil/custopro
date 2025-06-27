import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLoading } from './contexts/LoadingContext';

import Login from './components/Login/login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SelecionarCliente from './components/SelecionarCliente/SelecionarCliente';
import Dashboard from './components/dashboard/Dashboard';
import ResultadoLiqCentrosCustos from './components/ResultadoLiqCentrosCustos/ResultadoLiqCentrosCustos';
import MargemContribuicao from './components/MargemContribuicao/MargemContribuicao';
import ListaEmpresas from './components/Empresas/ListaEmpresas';
import VisualizarEmpresa from './components/Empresas/VisualizarEmpresa';
import NovaOuEditarEmpresa from './components/Empresas/NovaOuEditarEmpresa';
import GruposCentroCusto from './components/grupos-centro-custo/grupo';
import NovoGrupoCentroCusto from "./components/grupos-centro-custo/novo";
import EditarGrupoCentroCusto from './components/grupos-centro-custo/EditarGrupoCentroCusto';

const AppRoutes = () => {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timeout);
  }, [location]);

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
      <Route path="/grupos-centro-custo" element={<GruposCentroCusto />} />
      <Route path="/grupos-centro-custo/novo" element={<NovoGrupoCentroCusto />} />
      <Route path="/grupos-centro-custo/editar/:key" element={<EditarGrupoCentroCusto />} />
    </Routes>
  );
};

export default AppRoutes;
