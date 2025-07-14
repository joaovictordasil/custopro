// src/contexts/SubgruposContext.jsx
import React, { createContext, useState } from 'react';

export const SubgruposContext = createContext();

export const SubgruposProvider = ({ children }) => {
  const [subgrupos, setSubgrupos] = useState([
    { id: 1, nome: 'Clínica Médica', grupo: 'Clínica', status: 'Ativo' },
    { id: 2, nome: 'Especialistas', grupo: 'Clínica', status: 'Ativo' },
    { id: 3, nome: 'Exames de Imagem', grupo: 'Clínica', status: 'Ativo' },
  ]);

  const adicionarSubgrupo = (novo) => {
    setSubgrupos((prev) => [...prev, novo]);
  };

  const removerSubgrupo = (id) => {
    setSubgrupos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SubgruposContext.Provider value={{ subgrupos, adicionarSubgrupo, removerSubgrupo }}>
      {children}
    </SubgruposContext.Provider>
  );
};
