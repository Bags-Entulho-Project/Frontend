import {
  Form,
  Button,
  Card,
  Layout,
  Table,
  Drawer,
  Input,
  Popover,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarPessoa,
  editarPessoa,
  tirarPessoa,
} from "../../store/slices/pessoa/pessoa";
import { CirclePlus } from "lucide-react";
import { usePostPessoaMutation } from "../../store/slices/pessoa/queries";

function Pessoa() {
  const pessoas = useSelector((state) => state.pessoa.pessoa || []);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [postPessoa] = usePostPessoaMutation();

  const imovelColumns = [
    { title: "IPTU", dataIndex: "iptu", key: "iptu" },
    { title: "Logradouro", dataIndex: "logradouro", key: "logradouro" },
    { title: "Número", dataIndex: "numero", key: "numero" },
    { title: "CEP", dataIndex: "cep", key: "cep" },
    { title: "Bairro", dataIndex: "bairro", key: "bairro" },
    { title: "Cidade", dataIndex: "cidade", key: "cidade" },
    { title: "UF", dataIndex: "uf", key: "uf" },
    { title: "Complemento", dataIndex: "complemento", key: "complemento"}
  ];

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "CPF",
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
                      nome: record.nome,
                      cpf: record.cpf,
                      fone: record.fone,
                      celular: record.celular,
                      imoveis: record.imoveis || [
                        {
                          logradouro: "",
                          numero: "",
                          cep: "",
                          bairro: "",
                          cidade: "",
                          uf: "",
                        },
                      ],
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
            </>
          }
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
    const payload = {
      ...values,
      imoveis: values.imoveis || [],
    };

    if (isEditing) {
      dispatch(editarPessoa({ id, ...payload }));
    } else {
      postPessoa({ ...payload });
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
            title="Tabela de Pessoas"
            classNames={{ header: "card-table-head" }}
            extra={
              <Button type="primary" onClick={() => setIsOpen(true)}>
                Novo
              </Button>
            }
          >
            <Table
              dataSource={pessoas}
              columns={columns}
              rowKey="id"
              expandable={{
                expandedRowRender: (record) => (
                  <Table
                    columns={imovelColumns}
                    dataSource={record.imoveis || []}
                    pagination={false}
                    size="small"
                    rowKey={(row, index) =>
                      `${record.id}-imovel-${index}-${row.cep || "sem-cep"}`
                    }
                  />
                ),
                rowExpandable: (record) => (record.imoveis || []).length > 0,
              }}
              style={{ width: "130vh" }}
            />
          </Card>

          <Drawer
            title={isEditing ? "Editar Pessoa" : "Adicionar Pessoa"}
            open={isOpen}
            onClose={handleCancel}
            size={520}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                imoveis: [
                  {
                    iptu: "",
                    logradouro: "",
                    numero: "",
                    cep: "",
                    bairro: "",
                    cidade: "",
                    uf: "",
                  },
                ],
              }}
            >
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

              <Form.List name="imoveis">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Card
                        key={key}
                        size="small"
                        style={{
                          marginBottom: 12,
                          background: "#fafafa",
                        }}
                        title={`Imóvel ${index + 1}`}
                        extra={
                          <Button
                            danger
                            type="text"
                            onClick={() => remove(name)}
                          >
                            Remover
                          </Button>
                        }
                      >
                        <Form.Item
                          {...restField}
                          label="IPTU"
                          name={[name, "iptu"]}
                        >
                          <Input placeholder="Iptu do imovel" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="Logradouro"
                          name={[name, "logradouro"]}
                        >
                          <Input placeholder="Rua / Avenida" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="Número"
                          name={[name, "numero"]}
                        >
                          <Input placeholder="123" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="CEP"
                          name={[name, "cep"]}
                        >
                          <Input placeholder="18000-000" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="Bairro"
                          name={[name, "bairro"]}
                        >
                          <Input placeholder="Centro" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="Cidade"
                          name={[name, "cidade"]}
                        >
                          <Input placeholder="Bauru" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="UF"
                          name={[name, "uf"]}
                        >
                          <Input placeholder="SP" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label="Complemento"
                          name={[name, "complemento"]}
                        >
                          <Input placeholder="Informações adicionais" />
                        </Form.Item>
                      </Card>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        block
                        onClick={() =>
                          add({
                            logradouro: "",
                            numero: "",
                            cep: "",
                            bairro: "",
                            cidade: "",
                            uf: "",
                          })
                        }
                      >
                        + Adicionar imóvel
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  marginTop: "16px",
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

export default Pessoa;
