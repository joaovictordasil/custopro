import React from 'react';
import { Spin } from 'antd';
import './LoadingOverlay.css';


const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(20, 20, 20, 0.8)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const LoadingOverlay = () => (
  <div style={overlayStyle}>
    <Spin size="large" tip="Carregando..." className="custom-spinner"/>
  </div>
);

export default LoadingOverlay;
