import React, { useState } from 'react';
import './SelecionarCliente.css';
import { useNavigate } from 'react-router-dom';

const ComboCliente = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const navigate = useNavigate();

  const clientes = [
    { value: 'custospr_empresa_v1', label: 'Empresa v1' },
    { value: 'custospr_empresa_v2', label: 'Empresa v2' },
     { value: 'custospr_empresa_v3', label: 'Empresa v3' },
      { value: 'custospr_empresa_v4', label: 'Empresa v4' },
       { value: 'custospr_empresa_v5', label: 'Empresa v5' },
        { value: 'custospr_empresa_v6', label: 'Empresa v6' },
         { value: 'custospr_empresa_v7', label: 'Empresa v7' },
          { value: 'custospr_empresa_v8', label: 'Empresa v8' },
           { value: 'custospr_empresa_v8', label: 'Empresa v9' },

   
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clienteSelecionado) {
      alert(`Cliente selecionado: ${clienteSelecionado}`);
      navigate('/dashboard'); // redireciona para a tela de dashboard
    } else {
      alert('Por favor, selecione um cliente.');
    }
  };

  return (
    <div className="cliente-container">
      <form onSubmit={handleSubmit}>
        <h2>Selecione um Cliente</h2>
        <select
          name="cliente"
          id="cliente"
          className="form-control form-select"
          required
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
        >
          <option value="">-- Selecione um Cliente --</option>
          {clientes.map((cliente) => (
            <option key={cliente.value} value={cliente.value}>
              {cliente.label}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-selecionar">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default ComboCliente;
