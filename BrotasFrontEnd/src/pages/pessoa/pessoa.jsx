import { Form, Button, Card, Layout, Table, Drawer, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarPessoa,
  editarPessoa,
  tirarPessoa,
} from "../../store/slices/pessoa/pessoa";

function pessoa() {
  const pessoas = useSelector((state) => state.pessoa.pessoa);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Cpf",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Fone",
      dataIndex: "fone",
      key: "fone",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Ações",
      key: "actions",
      width: "100px",
      render: (_, record) => (
        <div
          style={{ display: "flex", gap: "8px", flexDirection: "row-reverse" }}
        >
          <Button
            size="small"
            onClick={() => {
              form.setFieldsValue({
                nome: record.nome,
                cpf: record.cpf,
                fone: record.fone,
                celular: record.celular,
              });
              setId(record.id);
              setIsOpen(true);
              setIsEditing(true);
            }}
          >
            Editar
          </Button>
          <Button
            size="small"
            danger
            onClick={() => dispatch(tirarPessoa({ id: record.id }))}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmit = (values) => {
    if (isEditing) {
      dispatch(editarPessoa({ id: id, ...values }));
    } else {
      dispatch(
        adicionarPessoa({ id: pessoas.length, key: pessoas.length, ...values }),
      );
    }
    form.resetFields();
    setIsOpen(false);
    setIsEditing(false);
    setId(null);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
    setIsEditing(false);
    setId(null);
  };

  return (
    <>
      <Layout className="card-pessoa">
        <Content>
          <Card
            title="Tabela de Pessoas"
            classNames={{ header: "card-pessoa-head" }}
            extra={
              <Button type="primary" onClick={() => setIsOpen(true)}>
                Novo
              </Button>
            }
          >
            <Table
              dataSource={pessoas}
              columns={columns}
              style={{ width: "130vh" }}
            />
          </Card>
          <Drawer
            title="Adicionar Pessoa"
            open={isOpen}
            onClose={handleCancel}
            size={420}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Nome"
                name="nome"
                rules={[{ required: true, message: "Informe o nome" }]}
              >
                <Input placeholder="Digite o nome" />
              </Form.Item>

              <Form.Item
                label="CPF"
                name="cpf"
                rules={[{ required: true, message: "Informe o CPF" }]}
              >
                <Input placeholder="Digite o CPF" />
              </Form.Item>

              <Form.Item label="Fone (fixo)" name="fone">
                <Input placeholder="Digite o telefone" />
              </Form.Item>

              <Form.Item label="Celular" name="celular">
                <Input placeholder="Digite o celular" />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                  {isEditing ? "Editar" : "Salvar"}
                </Button>
              </div>
            </Form>
          </Drawer>
        </Content>
      </Layout>
    </>
  );
}

export default pessoa;
