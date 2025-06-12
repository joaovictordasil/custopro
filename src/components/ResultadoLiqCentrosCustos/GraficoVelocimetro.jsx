import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoVelocimetro = ({ titulo, percentual, receita, resultado }) => {
  const corGradiente = (percentual) => {
    if (percentual <= -0.5) return ['#8B0000', '#B22222'];
    if (percentual <= 0) return ['#FF4500', '#FF8C00'];
    if (percentual <= 0.5) return ['#FFD700', '#ADFF2F'];
    return ['#32CD32', '#00FA9A'];
  };

  const cores = corGradiente(percentual);

  const data = {
    datasets: [
      {
        data: [Math.abs(percentual * 100), 100 - Math.abs(percentual * 100)],
        backgroundColor: [cores[1], '#E0E0E0'],
        borderWidth: 0,
        cutout: '80%',
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  return (
    <div style={{ width: 300, textAlign: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 12 }}>
      <h3 style={{ fontWeight: 700, fontSize: 16 }}>{titulo}</h3>
      <h2 style={{ color: percentual < 0 ? '#f5222d' : '#52c41a' }}>
        {(percentual * 100).toFixed(2)}%
      </h2>
      <div style={{ position: 'relative', height: 150 }}>
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 8,
          height: 8,
          backgroundColor: '#000',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <div><strong>Receita Bruta:</strong> R$ {receita.toLocaleString('pt-BR')}</div>
        <div><strong>Resultado Líquido:</strong> R$ {resultado.toLocaleString('pt-BR')}</div>
      </div>
    </div>
  );
};

export default GraficoVelocimetro;
