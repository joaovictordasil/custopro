import React, { useState } from 'react';
import {
  Typography,
  Button,
  Row,
  Col,
  Layout,
  Table,
  Space,
  Popconfirm,
  Input,
} from 'antd';
import {
  PlusOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';
import { useEmpresas } from '../../contexts/EmpresasContext';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

export default function ListaEmpresas() {
  const navigate = useNavigate();
  const { empresas, removerEmpresa } = useEmpresas();

  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [busca, setBusca] = useState('');

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.razao_social?.toLowerCase().includes(busca.toLowerCase()) ||
    empresa.cnpj?.includes(busca) ||
    empresa.marca?.toLowerCase().includes(busca.toLowerCase())
  );

  const columns = [
    { title: 'Marca', dataIndex: 'marca', key: 'marca' },
    { title: 'Tipo', dataIndex: 'tipo_empresa', key: 'tipo_empresa' },
    { title: 'Razão Social', dataIndex: 'razao_social', key: 'razao_social' },
    { title: 'CNPJ', dataIndex: 'cnpj', key: 'cnpj' },
    { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
    { title: 'Estado', dataIndex: 'estado', key: 'estado' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/empresas/visualizar/${record.id || record.key}`)}
          />

          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/empresas/editar/${record.id || record.key}`)}
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            onConfirm={() => removerEmpresa(record.id || record.key)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
              ) : (
                <MenuFoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Header>

        <Content style={{ margin: 24 }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: 50 }}>
            <Col>
              <Title level={2}>Empresas Cadastradas</Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/empresas/nova')}
              >
                Novo
              </Button>
            </Col>
          </Row>

          <Input.Search
            placeholder="Buscar por razão social, CNPJ ou marca"
            allowClear
            onChange={(e) => setBusca(e.target.value)}
            style={{ maxWidth: 400, marginBottom: 20 }}
          />

          <Table
            dataSource={empresasFiltradas.map((e, i) => ({ ...e, key: e.id || i }))}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </Content>
      </Layout>
    </Layout>
  );
}
