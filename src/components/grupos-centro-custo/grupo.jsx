import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Layout,
  Typography,
  Popconfirm,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGrupos } from '../../contexts/GruposCentroCustoContext';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const GruposCentroCusto = () => {
  const navigate = useNavigate();
  const { grupos, removerGrupo } = useGrupos();
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [searchText, setSearchText] = useState(''); 
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const handleExcluir = (key) => {
    removerGrupo(key);
    message.success('Grupo excluído com sucesso.');
  };

  const handleEditar = (key) => {
    navigate(`/grupos-centro-custo/editar/${key}`);
  };

  
  const filteredGrupos = grupos.filter(grupo =>
    grupo.nome.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Ativo' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" onClick={() => handleEditar(record.key)} />
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleExcluir(record.key)}
            okText="Sim"
            cancelText="Não"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value); 
  };

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
        <Logo collapsed={collapsed} />
        <MenuList darkTheme={darkTheme} />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 0 : 260, transition: 'margin-left 0.2s ease' }}>
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
              collapsed
                ? <MenuUnfoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
                : <MenuFoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
            }
            onClick={() => setCollapsed(!collapsed)}
          />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Header>

        <Content style={{ margin: 24, overflowY: 'auto' }}>
          <div style={{ background: '#f0f5ff', padding: 16, marginBottom: 16, borderRadius: 8 }}>
            <Title level={3} style={{ margin: 0 }}>Grupos de Centro de Custo</Title>
            <span>Cadastro {'>'} Grupos de Centro de Custo</span>
          </div>

          <div style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Exibir</span>
                <Select defaultValue={10} style={{ width: 80 }}>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={30}>30</Option>
                </Select>
                <span>resultados por página</span>
              </div>
              
              <Input.Search
                placeholder="Pesquisar"
                value={searchText}
                onChange={handleSearchChange} 
                style={{ width: 200 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/grupos-centro-custo/novo')}
              >
                Novo
              </Button>
            </div>
            
            <Table
              dataSource={filteredGrupos} 
              columns={columns}
              pagination={{ pageSize: 10 }}
            /> 
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GruposCentroCusto;
