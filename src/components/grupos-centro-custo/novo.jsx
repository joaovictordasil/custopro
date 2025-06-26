import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Layout,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useGrupos } from '../../contexts/GruposCentroCustoContext';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const NovoGrupoCentroCusto = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const { adicionarGrupo } = useGrupos();

  const handleSubmit = (values) => {
    const grupo = {
      ...values,
      status: values.status ? true : false, 
    };
    adicionarGrupo(grupo);
    navigate('/grupos-centro-custo');
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
          <div style={{
            background: '#f0f5ff',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <div>
              <Title level={3} style={{ margin: 0 }}>Grupo de Centro de Custo</Title>
              <span>Cadastro {'>'} Grupos de Centro de Custo {'>'} Novo Grupo de Centro de Custo</span>
            </div>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/grupos-centro-custo')}>
              Voltar
            </Button>
          </div>

          <div style={{ background: '#fff', padding: 24, borderRadius: 8, maxWidth: 800 }}>
            <Title level={6}>CADASTRAR NOVO GRUPO</Title>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Form.Item
                  name="nome"
                  label="Nome"
                  rules={[{ required: true, message: 'Informe o nome do grupo' }]}
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="tipo"
                  label="Tipo"
                  initialValue="Administrativo"
                  style={{ width: 200 }}
                >
                  <Select>
                    <Option value="Administrativo">Administrativo</Option>
                    <Option value="Assistencial">Assistencial</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  valuePropName="checked"
                  initialValue={true}
                  style={{ width: 120 }}
                >
                  <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                </Form.Item>
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit">Salvar</Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NovoGrupoCentroCusto;
