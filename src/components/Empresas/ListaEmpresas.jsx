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
  Avatar,
  Dropdown,
  Menu,
  Select,
} from 'antd';
import {
  PlusOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';
import { useEmpresas } from '../../contexts/EmpresasContext';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const { Option } = Select;

export default function ListaEmpresas() {
  const navigate = useNavigate();
  const { empresas, removerEmpresa } = useEmpresas();

  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [busca, setBusca] = useState('');
  const [pageSize, setPageSize] = useState(10);

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
          <Button icon={<EyeOutlined />} onClick={() => navigate(`/empresas/visualizar/${record.id || record.key}`)} />
          <Button icon={<EditOutlined />} onClick={() => navigate(`/empresas/editar/${record.id || record.key}`)} />
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

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        collapsedWidth={0}
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        width={260}
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

      <Layout
        style={{
          marginLeft: collapsed ? 0 : 260,
          transition: 'margin-left 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
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
            icon={collapsed ? <MenuUnfoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} /> : <MenuFoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <Avatar
                    size={32}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: darkTheme ? '#1890ff' : '#001529', color: '#fff' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      right: 0,
                      width: 10,
                      height: 10,
                      backgroundColor: '#52c41a',
                      borderRadius: '50%',
                      border: '2px solid white',
                    }}
                  />
                </div>
                <span style={{ color: darkTheme ? '#fff' : '#000', fontWeight: 500 }}>
                  João Victor
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: '100vh',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
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

          <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
            <Col>
              <Input.Search
                placeholder="Buscar por razão social, CNPJ ou marca"
                allowClear
                onChange={(e) => setBusca(e.target.value)}
                style={{ width: 400 }}
              />
            </Col>
            <Col>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Exibir</span>
                <Select defaultValue={pageSize} style={{ width: 80 }} onChange={setPageSize}>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={30}>30</Option>
                </Select>
                <span>resultados por página</span>
              </div>
            </Col>
          </Row>

          <Table
            dataSource={empresasFiltradas.map((e, i) => ({ ...e, key: e.id || i }))}
            columns={columns}
            pagination={{ pageSize }}
            bordered
          />
        </Content>
      </Layout>
    </Layout>
  );
}
