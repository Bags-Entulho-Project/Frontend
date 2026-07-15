import {
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
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarBag,
  editarBag,
  excluirBag,
} from "../../store/slices/bag/bag";
import { useState } from "react";
import { CirclePlus } from "lucide-react";

function bag() {
  const bags = useSelector((state) => state.bag.bag);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Código da Bag",
      dataIndex: "numero",
      key: "numero",
    },
    {
      title: "Observação",
      dataIndex: "observacao",
      key: "observacao",
    },
    {
      title: "Disponivel",
      dataIndex: "disponivel",
      key: "disponivel",
      render: (_, record) =>
        record.disponivel ? (
          <p style={{ color: "green" }}> Disponivel</p>
        ) : (
          <p style={{ color: "red" }}>Indisponivel</p>
        ),
    },
    {
      title: "Ações",
      key: "actions",
      width: "100px",
      className: "action-column",
      render: (_, record) => (
        <Popover
          content={
            <>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: "row-reverse",
                }}
              >
                <Button
                  size="small"
                  onClick={() => {
                    form.setFieldsValue({
                      numero: record.numero,
                      observacao: record.observacao,
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
                  onClick={() => dispatch(excluirBag({ id: record.id }))}
                >
                  Excluir
                </Button>
              </div>
            </>
          }
          trigger="click"
        >
          <Button
            type={"text"}
            icon={<CirclePlus cursor="pointer" color="#001529" opacity={0.5} />}
          ></Button>
        </Popover>
      ),
    },
  ];

  const handleSubmit = (values) => {
    if (isEditing) {
      dispatch(editarBag({ id: id, ...values }));
    } else {
      dispatch(
        adicionarBag({
          id: bags.length,
          key: bags.length,
          disponivel: true,
          ...values,
        }),
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
      <Layout className="card-tables">
        <Content>
          <Card
            title="Tabela de Bags"
            classNames={{ header: "card-table-head" }}
            extra={
              <Button type="primary" onClick={() => setIsOpen(true)}>
                Novo
              </Button>
            }
          >
            <Table
              dataSource={bags}
              columns={columns}
              style={{ width: "130vh" }}
            />
          </Card>
          <Drawer
            title="Adicionar Bag"
            open={isOpen}
            onClose={handleCancel}
            size={420}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Código da Bag"
                name="numero"
                rules={[{ required: true, message: "Informe o Numero da Bag" }]}
              >
                <Input placeholder="Digite o código da bag" />
              </Form.Item>

              <Form.Item label="Observação" name="observacao">
                <Input />
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

export default bag;
