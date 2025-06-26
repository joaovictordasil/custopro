import React, { useState } from 'react';
import { Layout, Button, DatePicker, Pagination, Row, Col } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import IndicadorCard from './IndicadorCard';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

dayjs.locale('pt-br');
const { Header, Sider, Content } = Layout;

const todosOsDados = [
  { titulo: 'Acessórios Para Cães', valor: '5.00' },
  { titulo: 'Anestesia', valor: '-10.00' },
  { titulo: 'Anestesia E Sedação', valor: '15.00' },
  { titulo: 'Aplicação', valor: '-20.00' },
  { titulo: 'Aplicações De Internação', valor: '25.00' },
  { titulo: 'Banho E Tosa', valor: '-30.00' },
  { titulo: 'Cirurgia', valor: '35.00' },
  { titulo: 'Clínica', valor: '-40.00' },
  { titulo: 'Consulta', valor: '45.00' },
  { titulo: 'Consulta Especialista', valor: '-50.00' },
  { titulo: 'Diárias De Internação', valor: '55.00' },
  { titulo: 'Ecodopplercardiograma', valor: '-60.00' },
  { titulo: 'Eletrocardiograma', valor: '65.00' },
  { titulo: 'Estética Animal', valor: '-70.00' },
  { titulo: 'Exame Laboratoriais Externos', valor: '75.00' },
  { titulo: 'Exame Laboratoriais Internos', valor: '-80.00' },
  { titulo: 'Farmácia', valor: '85.00' },
  { titulo: 'Gastos Plano De Saúde', valor: '-90.00' },
  { titulo: 'Internação', valor: '95.00' },
  { titulo: 'Laboratório', valor: '100.00' },
  { titulo: 'Microchip', valor: '-100.00' },
  { titulo: 'Pet Shop', valor: '-10.00' },
  { titulo: 'Planos De Saúde', valor: '-15.00' },
  { titulo: 'Procedimento', valor: '-20.00' },
  { titulo: 'Ração Para Cães E Gatos', valor: '-25.00' },
  { titulo: 'Radiologia Digital', valor: '-30.00' },
  { titulo: 'Sedação', valor: '-60.00' },
  { titulo: 'Vacinas', valor: '-60.00' },
];

const MargemContribuicao = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState(dayjs());
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(6);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const dadosPaginados = todosOsDados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
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
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 1000, height: '100vh' }}
      >
        <Logo />
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

        <Content style={{ margin: 24, overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#000' }}>
              <RiseOutlined style={{ marginRight: 15 }} />
              Margem de Contribuição: {dataSelecionada.format('MMMM [/] YYYY').replace(/^[a-z]/, c => c.toUpperCase())}
            </h1>
            <DatePicker
              locale={locale}
              picker="month"
              value={dataSelecionada}
              onChange={(date) => setDataSelecionada(date)}
              format="MMMM YYYY"
              allowClear={false}
              style={{ width: 200 }}
            />
          </div>

          <p style={{ textAlign: 'left', marginTop: 15 }}>Indicadores</p>

          <Row gutter={[16, 16]}>
  {dadosPaginados.map((item, index) => (
    <Col xs={24} sm={12} md={8} lg={6} key={index} style={{ display: 'flex' }}>
      <IndicadorCard titulo={item.titulo} valor={item.valor} />
    </Col>
  ))}
</Row>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={paginaAtual}
              pageSize={itensPorPagina}
              total={todosOsDados.length}
              onChange={(page, pageSize) => {
                setPaginaAtual(page);
                setItensPorPagina(pageSize);
              }}
              showSizeChanger
              pageSizeOptions={[ '6', '9', '12', '20']}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MargemContribuicao;
