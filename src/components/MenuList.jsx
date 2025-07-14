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

const { SubMenu, ItemGroup } = Menu;

const MenuList = ({ darkTheme, collapsed }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    console.log('clicou em:', key); 
    navigate(`/${key}`);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Avatar */}
      <div style={{ padding: '10px', textAlign: 'center', flexShrink: 0 }}>
        <Avatar
          size={48}
          icon={<UserOutlined />}
          style={{
            backgroundColor: darkTheme ? '#1890ff' : '#001529',
            display: 'block',
            margin: '0 auto',
          }}
        />
        {!collapsed && (
          <>
            <h1
              className={`adminitrador ${darkTheme ? 'dark' : 'light'}`}
              style={{ fontSize: '16px', marginTop: '6px' }}
            >
              JOAO VICTOR
            </h1>
            <p className={`adminitrador ${darkTheme ? 'dark' : 'light'}`}>Administrador</p>
          </>
        )}
      </div>

      
      <div
        className={`menu-scroll ${darkTheme ? 'dark' : 'light'}`}
        style={{ flex: 1, overflowY: 'auto' }}
      >
        <Menu
          theme={darkTheme ? 'dark' : 'light'}
          mode="inline"
          inlineCollapsed={false}
          className="menu-bar"
          onClick={handleMenuClick}
        >
          <p className="menu-title">Indicadores</p>
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            Dashboard
          </Menu.Item>

          <SubMenu key="indicadores" icon={<BarChartOutlined />} title="Indicadores">
            <Menu.Item key="margem">Margem de Contribuição</Menu.Item>
            <Menu.Item key="resultado">Resultado Liq. Centros de Custos</Menu.Item>
          </SubMenu>

          <p className="menu-title">Entrada de Dados</p>
          <SubMenu key="cadastros" icon={<FileOutlined />} title="Cadastros">
            <ItemGroup
              style={{
                maxHeight: 300,
                overflowY: 'auto',
                paddingRight: 10,
              }}
              className="hide-scrollbar"
            >
              <Menu.Item key="empresas">Empresas</Menu.Item>
              <Menu.Divider className={darkTheme ? 'divider-dark' : 'divider-light'} />
              <Menu.Item key="grupos-centro-custo">Grupo Centro de Custo</Menu.Item> 
              <Menu.Item key="subgrupos-centro-custo">Subgrupos Centro de Custo</Menu.Item>
              <Menu.Item key="centro-custo">Centros de Custo</Menu.Item>
              <Menu.Divider className={darkTheme ? 'divider-dark' : 'divider-light'} />
              <Menu.Item key="grupo-naturezas">Grupos de Naturezas</Menu.Item>
              <Menu.Item key="subgrupo-naturezas">Subgrupos de Naturezas</Menu.Item>
              <Menu.Item key="naturezas">Naturezas</Menu.Item>
              <Menu.Divider className={darkTheme ? 'divider-dark' : 'divider-light'} />
              <Menu.Item key="profissisonais">Profissionais</Menu.Item>
              <Menu.Item key="regras-profissisonais">Regras de Rateio Profissionais</Menu.Item>
              <Menu.Item key="horario-turnos">Definir Horário dos Turnos</Menu.Item>
              <Menu.Divider className={darkTheme ? 'divider-dark' : 'divider-light'} />
              <Menu.Item key="itens-depreciados">Itens Depreciados</Menu.Item>
              <Menu.Item key="rateio-centros">Regras de Rateio-Centros de Custos</Menu.Item>
              <Menu.Item key="pesos-itens">Pesos Itens</Menu.Item>
              <Menu.Item key="Margens-Lucro">Margens de Lucro</Menu.Item>
            </ItemGroup>
          </SubMenu>

          <SubMenu key="importar" icon={<DownloadOutlined />} title="Importar Dados">
            <Menu.Item key="Receitas-Despesas">Receitas/Despesas</Menu.Item>
            <Menu.Item key="Apenas-Receitas">Apenas Receitas</Menu.Item>
            <Menu.Item key="Produtos-Vendidos">Produtos Vendidos</Menu.Item>
            <Menu.Item key="Estoque">Estoque</Menu.Item>
          </SubMenu>

          <p className="menu-title">Relatórios</p>
          <SubMenu key="verificacao" icon={<ReadOutlined />} title="Verificação">
            <Menu.Item key="relatorio">Receitas</Menu.Item>
            <Menu.Item key="checklist">Despesas</Menu.Item>
          </SubMenu>

          <SubMenu key="estrategicos" icon={<ProfileOutlined />} title="Estratégicos">
            <Menu.Item key="balanco">Relatórios de Custos</Menu.Item>
            <Menu.Item key="resultado-rel">Relatórios de Resultado</Menu.Item>
            <Menu.Item key="dre">DRE Gerencial</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default MenuList;
