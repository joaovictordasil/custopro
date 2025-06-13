import React from 'react';
import { Card } from 'antd';

const IndicadorCard = ({ titulo, valor }) => {
  const valorNum = parseFloat(valor.replace(',', '.'));
  const isNegativoOuZero = valorNum <= 0;

  const cardStyle = {
    background: isNegativoOuZero
      ? 'linear-gradient(to right, #f96f4f, #f7973a)'
      : 'linear-gradient(to right, #00c896, #00aa7f)',
    color: '#fff',
    borderRadius: 10,
    width: 260,               // Tamanho fixo da largura
    height: 150,              // Tamanho fixo da altura
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const bodyStyle = {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  };

  return (
    <Card style={cardStyle} bodyStyle={bodyStyle}>
      <div style={{ fontSize: 16, marginBottom: 8 }}>{titulo}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/icons/download.svg"
          alt="ícone de download"
          width={32}
          height={32}
          style={{ marginRight: 8 }}
        />
        <span style={{ fontSize: 26, fontWeight: 'bold' }}>{valor} %</span>
      </div>
    </Card>
  );
};

export default IndicadorCard;
