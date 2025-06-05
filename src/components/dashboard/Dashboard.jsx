import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Button,
  Avatar,
  Dropdown,
  Menu,
  theme,
  Card,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DollarOutlined,
  ArrowDownOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import CountUp from 'react-countup';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

import './Dashboard.css';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

const { Header, Sider, Content } = Layout;

function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const {
    token: { ColorBgContainer },
  } = theme.useToken();

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar fixo */}
      <Sider
        collapsed={collapsed}
        collapsible
        collapsedWidth={0}
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        className="sidebar"
        width={200}
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

      {/* Conteúdo */}
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
            className="toggle"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
              ) : (
                <MenuFoldOutlined style={{ color: darkTheme ? '#fff' : '#000' }} />
              )
            }
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

        <Content style={{ margin: 24, overflowY: 'auto' }}>
          <h1 className="dashboard-title" style={{ color: darkTheme ? '#575555' : '#000' }}>
            Olá, bem-vindo de volta!
          </h1>
          <p>Painel de monitoramento</p>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={<span><DollarOutlined /> Receita</span>}
                bordered={false}
                className="dashboard-card card-receita"
                extra={<Button size="small" type="text" onClick={() => openModal('Detalhes de Receita')}>Ver mais</Button>}
              >
                <CountUp start={0} end={12000} duration={2.5} prefix="R$ " separator="." decimal="," decimals={2} />
                <Sparklines data={[5, 10, 5, 20, 8, 15]}><SparklinesLine color="white" /></Sparklines>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title={<span><ArrowDownOutlined /> Despesas</span>}
                bordered={false}
                className="dashboard-card card-despesas"
                extra={<Button size="small" type="text" onClick={() => openModal('Detalhes de Despesas')}>Ver mais</Button>}
              >
                <CountUp start={0} end={8000} duration={2.5} prefix="R$ " separator="." decimal="," decimals={2} />
                <Sparklines data={[20, 15, 18, 10, 5, 8]}><SparklinesLine color="white" /></Sparklines>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title={<span><RiseOutlined /> Lucro Líquido</span>}
                bordered={false}
                className="dashboard-card card-lucro"
                extra={<Button size="small" type="text" onClick={() => openModal('Detalhes de Lucro Líquido')}>Ver mais</Button>}
              >
                <CountUp start={0} end={4000} duration={2.5} prefix="R$ " separator="." decimal="," decimals={2} />
                <Sparklines data={[2, 3, 4, 5, 4, 6]}><SparklinesLine color="white" /></Sparklines>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title={<span><UserOutlined /> Usuários Ativos</span>}
                bordered={false}
                className="dashboard-card card-usuarios"
                extra={<Button size="small" type="text" onClick={() => openModal('Detalhes de Usuários Ativos')}>Ver mais</Button>}
              >
                <CountUp start={0} end={350} duration={2} suffix=" usuários" separator="." />
                <Sparklines data={[100, 200, 150, 250, 300, 350]}><SparklinesLine color="white" /></Sparklines>
              </Card>
            </Col>
          </Row>

          <Modal
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={() => setModalVisible(false)}
            title="Detalhes"
          >
            <p>{modalContent}</p>
            <p>Aqui você pode mostrar dados mais específicos do indicador selecionado.</p>
          </Modal>

          <div style={{ marginTop: 30 }}>
            <h2 style={{ color: darkTheme ? '#434141' : '#000' }}>Gráfico de Receita e Despesa</h2>
            <Line
              data={{
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                  {
                    label: 'Receita',
                    data: [5000, 7000, 9000, 10000, 12000, 15000],
                    borderColor: '#1890ff',
                    tension: 0.4,
                  },
                  {
                    label: 'Despesas',
                    data: [4000, 6000, 8500, 9500, 8000, 9000],
                    borderColor: '#f5222d',
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { labels: { color: darkTheme ? '#434141' : '#000' } },
                },
                scales: {
                  x: { ticks: { color: darkTheme ? '#434141' : '#000' } },
                  y: { ticks: { color: darkTheme ? '#434141' : '#000' } },
                },
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
