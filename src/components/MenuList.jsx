import { Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  BarChartOutlined,
  FileOutlined,
  DownloadOutlined,
  ProfileOutlined,
  ReadOutlined,
  AppstoreOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuList = ({ darkTheme, collapsed }) => {
  const navigate = useNavigate();

     const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };
  return (
    <>
      <div style={{ position: 'relative', width: 'fit-content', margin: '10px auto' }}>
        <Avatar
          size={48}
          icon={<UserOutlined />}
          style={{
            backgroundColor: darkTheme ? '#1890ff' : '#001529',
            display: 'block',
          }}
        />
        
        <span
          style={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            width: 12,
            height: 12,
            backgroundColor: '#52c41a',
            border: '2px solid white',
            borderRadius: '50%',
          }}
        />
      </div>

     {!collapsed && (
  <h1
    className={`adminitrador ${darkTheme ? 'dark' : 'light'}`}
    style={{ textAlign: 'center', fontSize: '16px', marginTop: '6px' }}
  >
    JOAO VICTOR
  </h1>
)}

<p className={`adminitrador ${darkTheme ? 'dark' : 'light'}`}>Adminitrador</p>

      <Menu
        theme={darkTheme ? 'dark' : 'light'}
        mode="inline"
        className="menu-bar"
        onClick={handleMenuClick} 
      >
        <p className="menu-title">Indicadores</p>
        <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
          Dashboard
        </Menu.Item>

        <SubMenu
          key="indicadores"
          icon={<BarChartOutlined />}
          title="Indicadores"
        >
          <Menu.Item key="margem">Margem de Contribuição</Menu.Item>
          <Menu.Item key="resultado">Resultado Liq. Centros de Custos</Menu.Item>
        </SubMenu>

       <p className="menu-title">Entrada de Dados</p>
        <SubMenu key="cadastros" icon={<FileOutlined />} title="Cadastros">
          <Menu.Item key="empresas">Empresas</Menu.Item>
          <Menu.Item key="grupo-centro">Grupo Centro de Custo</Menu.Item>
        </SubMenu>

        <SubMenu key="importar" icon={<DownloadOutlined />} title="Importar Dados">
          <Menu.Item key="import-excel">Importar Excel</Menu.Item>
          <Menu.Item key="import-csv">Importar CSV</Menu.Item>
        </SubMenu>

        <p className="menu-title">Relatórios</p>
        <SubMenu key="verificacao" icon={<ReadOutlined />} title="Verificação">
          <Menu.Item key="relatorio">Relatório Diário</Menu.Item>
          <Menu.Item key="checklist">Checklist</Menu.Item>
        </SubMenu>

        <SubMenu key="estrategicos" icon={<ProfileOutlined />} title="Estratégicos">
          <Menu.Item key="balanco">Balanço</Menu.Item>
          <Menu.Item key="kpi">KPIs</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default MenuList;
