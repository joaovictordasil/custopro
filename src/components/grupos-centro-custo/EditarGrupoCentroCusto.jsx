import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Layout,
  Typography,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useGrupos } from '../../contexts/GruposCentroCustoContext';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const EditarGrupoCentroCusto = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { key } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const { grupos, editarGrupo } = useGrupos();
  const grupoExistente = grupos.find((g) => g.key === key);

  useEffect(() => {
    if (grupoExistente) {
      form.setFieldsValue({
        nome: grupoExistente.nome,
        tipo: grupoExistente.tipo,
        status: grupoExistente.status === 'Ativo',
      });
    }
  }, [grupoExistente, form]);

  const handleSubmit = (values) => {
    editarGrupo(key,{
      ...values,
      status: values.status ? 'Ativo' : 'Inativo',
      
    });
    message.success('Grupo atualizado com sucesso.');
    navigate('/grupos-centro-custo');
  };

  if (!grupoExistente) {
    return <div style={{ padding: 24 }}>Grupo não encontrado.</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        collapsedWidth={0}
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
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
              <Title level={3} style={{ margin: 0 }}>Editar Grupo</Title>
              <span>Cadastro {'>'} Grupos de Centro de Custo {'>'} Editar</span>
            </div>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/grupos-centro-custo')}>
              Voltar
            </Button>
          </div>

          <div style={{ background: '#fff', padding: 24, borderRadius: 8, maxWidth: 800 }}>
            <Title level={6}>EDITAR GRUPO</Title>
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
                <Form.Item name="tipo" label="Tipo" style={{ width: 200 }}>
                  <Select>
                    <Option value="Administrativo">Administrativo</Option>
                    <Option value="Assistencial">Assistencial</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  valuePropName="checked"
                  style={{ width: 120 }}
                >
                  <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                </Form.Item>
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit">Salvar Alterações</Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditarGrupoCentroCusto;
