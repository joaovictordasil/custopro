import React, { createContext, useContext, useState } from 'react';

const EmpresasContext = createContext();

export const useEmpresas = () => useContext(EmpresasContext);

export const EmpresasProvider = ({ children }) => {
  const [empresas, setEmpresas] = useState([]);

  const adicionarEmpresa = (novaEmpresa) => {
    const empresaComId = {
      ...novaEmpresa,   id: Date.now(), };  //id unico
       setEmpresas((prev) => [...prev, empresaComId]);
   };  
 
 

  const editaEmpresa = (id, dadosAtualizados) => {
    setEmpresas((prev) =>
      prev.map((empresa) =>
        empresa.id === parseInt(id) ? { ...empresa, ...dadosAtualizados,id } : empresa
      )
    );
  };

  const removerEmpresa = (id) => {
    setEmpresas((prev) => prev.filter((empresa) => empresa.id !== id));
  };

  return (
    <EmpresasContext.Provider
      value={{ empresas, adicionarEmpresa, editaEmpresa, removerEmpresa }}
    >
      {children}
    </EmpresasContext.Provider>
  );
};
