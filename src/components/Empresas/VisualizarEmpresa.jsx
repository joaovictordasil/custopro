import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Row, Col, Button, Descriptions } from 'antd';
import {
  MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';

import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';
import { useEmpresas } from '../../contexts/EmpresasContext';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function VisualizarEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { empresas } = useEmpresas();

  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const encontrada = empresas.find((e) => e.id === parseInt(id));
    if (encontrada) setEmpresa(encontrada);
  }, [id, empresas]);

  if (!empresa) {
    return <div style={{ padding: 20 }}>Empresa não encontrada.</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        collapsedWidth={0}
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 1000, height: '100vh' }}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 0 : 200 }}>
        <Header
          style={{
            padding: '0 16px',
            background: darkTheme ? '#001529' : '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            type="text"
            icon={collapsed
              ? <MenuUnfoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
              : <MenuFoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Header>

        <Content style={{ padding: 24 }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
            <Col><Title level={2}>Visualizar Empresa</Title></Col>
<Col>
  <Button
    onClick={() => navigate('/empresas')}
    style={{
      backgroundColor: '#1890ff',
      color: '#fff',
      border: 'none'
    }}
  >
    Voltar
  </Button>
</Col>
          </Row>

          <Descriptions bordered column={2} size="middle">
            <Descriptions.Item label="Marca">{empresa.marca}</Descriptions.Item>
            <Descriptions.Item label="Tipo">{empresa.tipo_empresa}</Descriptions.Item>
            <Descriptions.Item label="Razão Social">{empresa.razao_social}</Descriptions.Item>
            <Descriptions.Item label="Apelido">{empresa.apelido || '-'}</Descriptions.Item>
            <Descriptions.Item label="Telefone">{empresa.telefone}</Descriptions.Item>
            <Descriptions.Item label="CNPJ">{empresa.cnpj}</Descriptions.Item>
            <Descriptions.Item label="Endereço">{empresa.endereco}</Descriptions.Item>
            <Descriptions.Item label="Complemento">{empresa.complemento || '-'}</Descriptions.Item>
            <Descriptions.Item label="Bairro">{empresa.bairro}</Descriptions.Item>
            <Descriptions.Item label="Cidade">{empresa.cidade}</Descriptions.Item>
            <Descriptions.Item label="Estado">{empresa.estado}</Descriptions.Item>
            <Descriptions.Item label="CEP">{empresa.cep}</Descriptions.Item>
          </Descriptions>
        </Content>
      </Layout>
    </Layout>
  );
}
