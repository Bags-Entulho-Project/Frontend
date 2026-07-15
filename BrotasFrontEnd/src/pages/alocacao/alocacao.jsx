import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Layout,
  Popover,
  Select,
  Table,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  adicionarAlocacao,
  devolverAlocacao,
  editarAlocacao,
  excluirAlocacao,
} from "../../store/slices/alocacao/alocacao";
import { CirclePlus } from "lucide-react";
import { changeStatus } from "../../store/slices/bag/bag";

function alocacao() {
  const alocacoes = useSelector((state) => state.alocacao.alocacao);
  const pessoas = useSelector((state) => state.pessoa.pessoa);
  const bags = useSelector((state) => state.bag.bag);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [oldId, setOldId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Pessoa",
      dataIndex: "pessoa",
      key: "pessoa",
    },
    {
      title: "Bag",
      dataIndex: "bag",
      key: "bag",
      render: id => bags.find((b) => b.id == id).numero,
    },
    {
      title: "Entrega",
      dataIndex: "entrega",
      key: "entrega",
    },
    {
      title: "Devolução",
      dataIndex: "devolucao",
      key: "devolucao",
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
                      pessoa: record.pessoa,
                      bag: record.bag,
                    });
                    setId(record.id);
                    setOldId(record.bag)
                    setIsOpen(true);
                    setIsEditing(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(devolverAlocacao({ id: record.id }));
                    dispatch(changeStatus({id: record.bag}));
                  }}
                >
                  Devolver
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    dispatch(excluirAlocacao({ id: record.id }))
                    dispatch(changeStatus({id: record.bag}))
                }}
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
      dispatch(editarAlocacao({ id: id, ...values }));
      if(values.bag !== oldId){
        dispatch(changeStatus({id: oldId}))
      }
    } else {
      dispatch(
        adicionarAlocacao({
          id: alocacoes.length,
          key: alocacoes.length,
          entrega: new Date().toLocaleString("pt-BR"),
          devolucao: null,
          ...values,
        }),
      );
      dispatch(changeStatus({id: values.bag}))
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
            title="Tabela de Alocações"
            classNames={{ header: "card-table-head" }}
            extra={
              <Button type="primary" onClick={() => setIsOpen(true)}>
                Novo
              </Button>
            }
          >
            <Table
              dataSource={alocacoes}
              columns={columns}
              style={{ width: "130vh" }}
            />
          </Card>
          <Drawer
            title="Adicionar Alocação"
            open={isOpen}
            onClose={handleCancel}
            size={420}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Pessoa"
                name="pessoa"
                rules={[{ required: true, message: "Informe a pessoa" }]}
              >
                <Select
                  showSearch={{ optionFilterProp: "label" }}
                  placeholder="Selecione uma pessoa"
                  options={pessoas.map((p) => ({
                    label: p.nome,
                    value: p.nome,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Bag"
                name="bag"
                rules={[{ required: true, message: "Informe uma Bag" }]}
              >
                <Select
                  showSearch={{ optionFilterProp: "label" }}
                  placeholder="Selecione uma bag"
                  options={bags
                    .filter((b) => b.disponivel)
                    .map((b) => ({
                      label: b.numero,
                      value: b.id,
                    }))}
                />
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

export default alocacao;
