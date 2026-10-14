import {
  App as AntApp,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Layout,
  Popover,
  Table,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import {
  useAlterarStatusBagMutation,
  useAtualizarBagMutation,
  useCriarBagMutation,
  useGetBagsQuery,
} from "../../store/services/catalogApi";

const errorMessage = (error) =>
  error?.data?.message ||
  error?.data ||
  "Não foi possível concluir a operação.";

function Bag() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { message } = AntApp.useApp();
  const { data: bags = [], isFetching } = useGetBagsQuery();
  const [criarBag] = useCriarBagMutation();
  const [atualizarBag] = useAtualizarBagMutation();
  const [alterarStatusBag] = useAlterarStatusBagMutation();

  const closeDrawer = () => {
    form.resetFields();
    setIsOpen(false);
    setIsEditing(false);
  };
  const abrirNovo = () => {
    form.resetFields();
    setIsEditing(false);
    setIsOpen(true);
  };
  const editar = (bag) => {
    form.setFieldsValue(bag);
    setIsEditing(true);
    setIsOpen(true);
  };
  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await atualizarBag(values).unwrap();
        message.success("Bag atualizada.");
      } else {
        await criarBag({ ...values, disponivel: true }).unwrap();
        message.success("Bag cadastrada.");
      }
      closeDrawer();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };
  const alterarStatus = async (id) => {
    try {
      await alterarStatusBag(id).unwrap();
      message.success("Status da bag atualizado.");
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const columns = [
    { title: "Código da Bag", dataIndex: "numero" },
    { title: "Observação", dataIndex: "observacao" },
    {
      title: "Disponível",
      dataIndex: "disponivel",
      render: (disponivel) => (
        <span style={{ color: disponivel ? "green" : "red" }}>
          {disponivel ? "Disponível" : "Indisponível"}
        </span>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      width: 100,
      className: "action-column",
      render: (_, record) => (
        <Popover
          trigger="click"
          content={
            <div
              style={{ display: "flex", gap: 8, flexDirection: "row-reverse" }}
            >
              <Button size="small" onClick={() => editar(record)}>
                Editar
              </Button>
              <Button
                size="small"
                danger
                onClick={() => alterarStatus(record.id)}
              >
                {record.isCancel ? "Ativar" : "Inativar"}
              </Button>
            </div>
          }
        >
          <Button
            type="text"
            icon={<CirclePlus cursor="pointer" color="#001529" opacity={0.5} />}
          />
        </Popover>
      ),
    },
  ];

  return (
    <Layout className="card-tables">
      <Content>
        <Card
          title="Tabela de Bags"
          classNames={{ header: "card-table-head" }}
          extra={
            <Button type="primary" onClick={abrirNovo}>
              Novo
            </Button>
          }
        >
          <Table
            dataSource={bags}
            columns={columns}
            rowKey="id"
            loading={isFetching}
            style={{ width: "130vh" }}
          />
        </Card>
        <Drawer
          title={isEditing ? "Editar Bag" : "Adicionar Bag"}
          open={isOpen}
          onClose={closeDrawer}
          size={420}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Código da Bag"
              name="numero"
              rules={[{ required: true, message: "Informe o número da bag" }]}
            >
              <Input placeholder="Digite o código da bag" />
            </Form.Item>
            <Form.Item label="Observação" name="observacao">
              <Input />
            </Form.Item>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <Button onClick={closeDrawer}>Cancelar</Button>
              <Button type="primary" htmlType="submit">
                {isEditing ? "Salvar alterações" : "Salvar"}
              </Button>
            </div>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  );
}

export default Bag;
