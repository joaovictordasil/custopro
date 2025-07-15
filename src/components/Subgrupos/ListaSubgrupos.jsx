import React, { useContext, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Tag,
  Space,
  Select,
  Layout,
  Typography,
  Avatar,
  Dropdown,
  Menu,
  theme,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SubgruposContext } from '../../contexts/SubgruposContext';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';



const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;


const ListaSubgrupos = () => {
  const navigate = useNavigate();
  const { subgrupos, removerSubgrupo } = useContext(SubgruposContext);
  
  const {
    token:{colorText},
  } =theme.useToken();
  
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [searchText, setSearchText] = useState('');

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const filtrados = subgrupos.filter((item) =>
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
        Sair
      </Menu.Item>
    </Menu>
  );

  const colunas = [
    {
      title: 'NOME',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'GRUPO CENTRO CUSTO',
      dataIndex: 'grupo',
      key: 'grupo',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Ativo' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'AÇÕES',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => removerSubgrupo(record.id)}
          />
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
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: darkTheme ? '#fff' : '#000' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <Avatar
                    size={32}
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: darkTheme ? '#1890ff' : '#001529',
                      color: '#fff',
                    }}
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
            margin: 24,
            padding: 24,
            minHeight: '100vh',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          
        

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Title level={2} style={{ color: colorText, fontWeight: 500 }}>
              SUBGRUPOS DE CENTRO DE CUSTO
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/subgrupos-centro-custo/novo')}
            >
              Novo
            </Button>
          </div>
            


          <div style={{ marginBottom: 18, display: 'flex', gap: 16 }}>
            <Select defaultValue={100} style={{ width: 120 }}>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={30}>30</Option>
            </Select>
            <Input.Search
              placeholder="Pesquisar"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 1000 }}
            />
          </div>

          <Table
            dataSource={filtrados}
            columns={colunas}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListaSubgrupos;
