import React, { createContext, useContext, useState } from 'react';

const EmpresasContext = createContext();


export const useEmpresas = () => useContext(EmpresasContext);


export const EmpresasProvider = ({ children }) => {
  const [empresas, setEmpresas] = useState([]);

  const adicionarEmpresa = (novaEmpresa) => {
    const empresaComId = {
      ...novaEmpresa,
      id: Date.now(), 
    };
    setEmpresas((prev) => [...prev, empresaComId]);
  };

  const removerEmpresa = (id) => {
    setEmpresas((prev) => prev.filter((empresa) => empresa.id !== id));
  };

  return (
    <EmpresasContext.Provider
      value={{ empresas, adicionarEmpresa, removerEmpresa }}
    >
      {children}
    </EmpresasContext.Provider>
  );
};
