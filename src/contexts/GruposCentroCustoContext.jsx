import React, { createContext, useContext, useState } from 'react';


const GruposContext = createContext();


export const useGrupos = () => useContext(GruposContext);


export const GruposProvider = ({ children }) => {
  const [grupos, setGrupos] = useState([
    { key: '1', nome: 'Anestesia e Sedação', tipo: 'Administrativo', status: 'Ativo' },
    { key: '2', nome: 'Cirurgia', tipo: 'Administrativo', status: 'Ativo' },
  ]);

  const adicionarGrupo = (novoGrupo) => {
    const grupoComChave = {
      ...novoGrupo,
      key: Date.now().toString(),
      status: novoGrupo.status ? 'Ativo' : 'Inativo',
    };
    setGrupos((prev) => [...prev, grupoComChave]);
  };

  const editarGrupo = (key, grupoAtualizado) => {
    setGrupos((prev) =>
      prev.map((grupo) =>
        grupo.key === key ? { ...grupo, ...grupoAtualizado } : grupo
      )
    );
  };

  const removerGrupo = (key) => {
    setGrupos((prev) => prev.filter((grupo) => grupo.key !== key));
  };

  return (
    <GruposContext.Provider
      value={{ grupos, adicionarGrupo, editarGrupo, removerGrupo }}
    >
      {children}
    </GruposContext.Provider>
  );
};
