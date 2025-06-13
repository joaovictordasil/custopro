import React, { useState } from 'react';
import { Layout, Button, DatePicker, Pagination } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';

import GraficoVelocimetro from './GraficoVelocimetro';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

const { Header, Sider, Content } = Layout;

const ResultadoLiqCentrosCustos = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState(dayjs());
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(6);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const todosOsGraficos = [
    { titulo: "ACESSÓRIOS PARA CÃES", percentual: 0.05, receita: 2500, resultado: 1200 },
    { titulo: "ANESTESIA", percentual: 0.10, receita: 1800, resultado: 800 },
    { titulo: "ANESTESIA E SEDAÇÃO", percentual: 0.15, receita: 3200, resultado: 2200 },
    { titulo: "APLICAÇÃO", percentual: 0.20, receita: 2100, resultado: 1500 },
    { titulo: "APLICAÇÕES DE INTERNAÇÃO", percentual: 0.25, receita: 4300, resultado: 3000 },
    { titulo: "BANHO E TOSA", percentual: 0.30, receita: 1600, resultado: 900 },
    { titulo: "CIRURGIA", percentual: 0.35, receita: 5100, resultado: 3800 },
    { titulo: "CLÍNICA", percentual: 0.40, receita: 2900, resultado: 1400 },
    { titulo: "CONSULTA", percentual: 0.45, receita: 2600, resultado: 1600 },
    { titulo: "CONSULTA ESPECIALISTA", percentual: 0.50, receita: 3700, resultado: 2200 },
    { titulo: "DIÁRIAS DE INTERNAÇÃO", percentual: 0.55, receita: 3700, resultado: 2200 },
    { titulo: "ECODOPPLERCARDIOGRAMA", percentual: 0.60, receita: 3700, resultado: 2200 },
    { titulo: "ELETROCARDIOGRAMA", percentual: 0.65, receita: 3700, resultado: 2200 },
    { titulo: "ESTÉTICA ANIMAL", percentual: 0.70, receita: 3700, resultado: 2200 },
    { titulo: "EXAME LABORATORIAIS EXTERNOS", percentual: 0.75, receita: 3700, resultado: 2200 },
    { titulo: "EXAME LABORATORIAIS INTERNOS", percentual: 0.80, receita: 3700, resultado: 2200 },
    { titulo: "FARMÁCIA", percentual: 0.85, receita: 3700, resultado: 2200 },
    { titulo: "GASTOS PLANO DE SAÚDE", percentual: 0.90, receita: 3700, resultado: 2200 },
    { titulo: "INTERNAÇÃO", percentual: 0.95, receita: 3700, resultado: 2200 },
    { titulo: "LABORATÓRIO", percentual: 1.0, receita: 3700, resultado: 2200 },
    { titulo: "MICROCHIP", percentual: -1.0, receita: 3700, resultado: 2200 },
    { titulo: "PET SHOP", percentual: -0.10, receita: 3700, resultado: 2200 },
    { titulo: "PLANOS DE SAÚDE", percentual: -0.15, receita: 3700, resultado: 2200 },
    { titulo: "PROCEDIMENTO", percentual: -0.20, receita: 3700, resultado: 2200 },
    { titulo: "RAÇÃO PARA CÃES E GATOS", percentual: -0.25, receita: 3700, resultado: 2200 },
    { titulo: "RADIOLOGIA DIGITAL", percentual: -0.30, receita: 3700, resultado: 2200 },
    { titulo: "SEDAÇÃO", percentual: -0.60, receita: 3700, resultado: 2200 },
    { titulo: "VACINAS", percentual: -0.60, receita: 3700, resultado: -2200 },
   


  ];

  const graficosPaginados = todosOsGraficos.slice(
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
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 1000, height: '100vh' }}
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
            <h1 style={{ color: darkTheme ? '#000' : '#000' }}>
              <RiseOutlined style={{ marginRight: 10 }} />
              Indicador de status dos centros de custo: {dataSelecionada.format('MMMM [/] YYYY').replace(/^[a-z]/, c => c.toUpperCase())}
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

          <p style={{ textAlign: 'left', marginTop: 12 }}>Resultado Líquido</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 32 }}>
            {graficosPaginados.map((grafico, index) => (
              <GraficoVelocimetro
                key={index}
                titulo={grafico.titulo}
                percentual={grafico.percentual}
                receita={grafico.receita}
                resultado={grafico.resultado}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={paginaAtual}
              pageSize={itensPorPagina}
              total={todosOsGraficos.length}
              onChange={(page, pageSize) => {
                setPaginaAtual(page);
                setItensPorPagina(pageSize);
              }}
              showSizeChanger
              pageSizeOptions={['3', '6', '9', '12']}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ResultadoLiqCentrosCustos;
