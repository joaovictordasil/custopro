import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Row,
  Col,
  Typography,
  message,
  Layout,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import InputMask from 'react-input-mask-next';
import Logo from '../Logo';
import MenuList from '../MenuList';
import ToggleThemeButton from '../ToggleThemeButton';
import { useEmpresas } from '../contexts/EmpresasContext';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

export default function NovaEmpresa() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { adicionarEmpresa } = useEmpresas();

  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const onFinish = (values) => {
    adicionarEmpresa(values);
    message.success('Empresa cadastrada com sucesso!');
    navigate('/empresas');
  };

  const toggleTheme = () => setDarkTheme(!darkTheme);

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
          height: '100vh'
        }}
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

        <Content style={{ margin: 15, overflowY: 'auto' }}>
          <div style={{ padding: '25px', maxWidth: 1000, margin: '0 auto' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title level={15}>Cadastrar Empresa</Title>
              </Col>
              <Col>
                <Button type="primary" onClick={() => navigate('/empresas')}>
                  Voltar
                </Button>
              </Col>
            </Row>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark="optional"
            >
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Marca"
                    name="marca"
                    rules={[{ required: true, message: 'Informe a marca' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Tipo de Empresa"
                    name="tipo_empresa"
                    rules={[{ required: true, message: 'Selecione o tipo de empresa' }]}
                  >
                    <Radio.Group>
                      <Radio.Button value="matriz">Matriz</Radio.Button>
                      <Radio.Button value="filial">Filial</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Razão Social"
                    name="razao_social"
                    rules={[{ required: true, message: 'Informe a razão social' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Apelido" name="apelido">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="CNPJ"
                    name="cnpj"
                    rules={[{ required: true, message: 'Informe o CNPJ' }]}
                  >
                    <InputMask mask="99.999.999/9999-99" className="ant-input" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Endereço"
                    name="endereco"
                    rules={[{ required: true, message: 'Informe o endereço' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Complemento" name="complemento">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Bairro"
                    name="bairro"
                    rules={[{ required: true, message: 'Informe o bairro' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Cidade"
                    name="cidade"
                    rules={[{ required: true, message: 'Informe a cidade' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[{ required: true, message: 'Informe o estado' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="CEP"
                    name="cep"
                    rules={[{ required: true, message: 'Informe o CEP' }]}
                  >
                    <InputMask mask="99999-999" className="ant-input" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
