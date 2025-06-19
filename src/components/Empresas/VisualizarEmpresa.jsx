import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Descriptions, Button, Row, Col } from 'antd';
import { useEmpresas } from '../contexts/EmpresasContext';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

export default function VisualizarEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { empresas } = useEmpresas();
  const empresa = empresas[id];

  const [collapsed, setCollapsed] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(true);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  if (!empresa) {
    return <div>Empresa não encontrada</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        collapsedWidth={0}
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          height: '100vh',
        }}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 0 : 200, transition: 'margin-left 0.2s ease' }}>
        <Header
          style={{
            padding: '0 16px',
            background: darkTheme ? '#001529' : '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Header>

        <Content style={{ margin: 24 }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
            <Col>
              <Title level={3}>Visualizar Empresa</Title>
            </Col>
            <Col>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/empresas')}
                style={{ marginRight: 8 }}
              >
                Voltar
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate(`/empresas/editar/${id}`)}
              >
                Editar
              </Button>
            </Col>
          </Row>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="Marca">{empresa.marca}</Descriptions.Item>
            <Descriptions.Item label="Tipo de Empresa">{empresa.tipo_empresa}</Descriptions.Item>
            <Descriptions.Item label="Razão Social">{empresa.razao_social}</Descriptions.Item>
            <Descriptions.Item label="Apelido">{empresa.apelido}</Descriptions.Item>
            <Descriptions.Item label="CNPJ">{empresa.cnpj}</Descriptions.Item>
            <Descriptions.Item label="Endereço">{empresa.endereco}</Descriptions.Item>
            <Descriptions.Item label="Complemento">{empresa.complemento}</Descriptions.Item>
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
