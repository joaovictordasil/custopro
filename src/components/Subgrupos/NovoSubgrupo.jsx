import React, { useState, useContext } from 'react';
import {
  Input,
  Button,
  Select,
  Switch,
  Layout,
  Typography,
  Avatar,
  Dropdown,
  Menu,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SubgruposContext } from '../../contexts/SubgruposContext';
import Logo from '../Logo';
import MenuList from '../MenuList';

const { Option } = Select;
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const NovoSubgrupo = () => {
  const { adicionarSubgrupo } = useContext(SubgruposContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const darkTheme = true;; // usado somente no menu

  const handleSalvar = () => {
    adicionarSubgrupo({
      id: Date.now(),
      nome,
      grupo,
      status: ativo ? 'Ativo' : 'Inativo',
    });
    navigate('/subgrupos-centro-custo');
  };

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
            background: '#fff',
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
            style={{ color: '#000' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <Avatar
                    size={32}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#001529', color: '#fff' }}
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
                <span style={{ color: '#000', fontWeight: 500 }}>João Victor</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: 24,
            padding: 24,
            background: '#fff',
            minHeight: '100vh',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/subgrupos-centro-custo')}
            >
              Voltar
            </Button>
            <Title level={3} style={{ margin: 0 }}>CADASTRAR NOVO SUBGRUPO</Title>
            <div /> {/* espaçador para alinhar */}
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            <Input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              placeholder="Escolha um grupo"
              onChange={(value) => setGrupo(value)}
              style={{ width: 200 }}
            >
              <Option value="Clínica">Clínica</Option>
              <Option value="Financeiro">Financeiro</Option>
            </Select>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Status</span>
              <Switch checked={ativo} onChange={(checked) => setAtivo(checked)} />
            </div>
          </div>

          <Button type="primary" onClick={handleSalvar} style={{ marginTop: 24 }}>
            Salvar
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NovoSubgrupo;
