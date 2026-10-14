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
  useAlterarStatusPessoaMutation,
  useAtualizarPessoaMutation,
  useCriarPessoaMutation,
  useGetPessoasQuery,
} from "../../store/services/catalogApi";

const enderecoVazio = {
  iptu: "",
  logradouro: "",
  numero: "",
  cep: "",
  bairro: "",
  cidade: "",
  uf: "",
  complemento: "",
};
const errorMessage = (error) =>
  error?.data?.message ||
  error?.data ||
  "Não foi possível concluir a operação.";

function Pessoa() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { message } = AntApp.useApp();
  const { data: pessoas = [], isFetching } = useGetPessoasQuery();
  const [criarPessoa] = useCriarPessoaMutation();
  const [atualizarPessoa] = useAtualizarPessoaMutation();
  const [alterarStatusPessoa] = useAlterarStatusPessoaMutation();

  const closeDrawer = () => {
    form.resetFields();
    setIsOpen(false);
    setIsEditing(false);
  };

  const abrirNovo = () => {
    form.resetFields();
    form.setFieldsValue({ imoveis: [enderecoVazio] });
    setIsEditing(false);
    setIsOpen(true);
  };

  const editar = (record) => {
    form.setFieldsValue({
      ...record,
      imoveis: record.imoveis?.length ? record.imoveis : [enderecoVazio],
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await atualizarPessoa(values).unwrap();
        message.success("Pessoa atualizada.");
      } else {
        await criarPessoa(values).unwrap();
        message.success("Pessoa cadastrada.");
      }
      closeDrawer();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const inativar = async (id) => {
    try {
      await alterarStatusPessoa(id).unwrap();
      message.success("Status da pessoa atualizado.");
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const imovelColumns = [
    { title: "IPTU", dataIndex: "iptu" },
    { title: "Logradouro", dataIndex: "logradouro" },
    { title: "Número", dataIndex: "numero" },
    { title: "CEP", dataIndex: "cep" },
    { title: "Bairro", dataIndex: "bairro" },
    { title: "Cidade", dataIndex: "cidade" },
    { title: "UF", dataIndex: "uf" },
    { title: "Complemento", dataIndex: "complemento" },
  ];
  const columns = [
    { title: "Nome", dataIndex: "nome" },
    { title: "CPF", dataIndex: "cpf" },
    { title: "Fone", dataIndex: "fone" },
    { title: "Celular", dataIndex: "celular" },
    { title: "Alocações", dataIndex: "quantidadeAlocacoes", align: "center" },
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
              <Button size="small" danger onClick={() => inativar(record.id)}>
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
          title="Tabela de Pessoas"
          classNames={{ header: "card-table-head" }}
          extra={
            <Button type="primary" onClick={abrirNovo}>
              Novo
            </Button>
          }
        >
          <Table
            dataSource={pessoas}
            columns={columns}
            rowKey="id"
            loading={isFetching}
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  columns={imovelColumns}
                  dataSource={record.imoveis || []}
                  pagination={false}
                  size="small"
                  rowKey="id"
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
          onClose={closeDrawer}
          size={520}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Celular"
              name="celular"
              rules={[{ required: true, message: "Informe o celular" }]}
            >
              <Input placeholder="Digite o celular" />
            </Form.Item>
            <Form.List name="imoveis">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Card
                      key={key}
                      size="small"
                      style={{ marginBottom: 12, background: "#fafafa" }}
                      title={`Imóvel ${index + 1}`}
                      extra={
                        <Button
                          danger
                          type="text"
                          disabled={fields.length === 1}
                          onClick={() => remove(name)}
                        >
                          Remover
                        </Button>
                      }
                    >
                      <Form.Item {...restField} name={[name, "id"]} hidden>
                        <Input />
                      </Form.Item>
                      {[
                        "iptu",
                        "logradouro",
                        "numero",
                        "cep",
                        "bairro",
                        "cidade",
                        "uf",
                      ].map((campo) => (
                        <Form.Item
                          key={campo}
                          {...restField}
                          label={
                            campo === "uf"
                              ? "UF"
                              : campo[0].toUpperCase() + campo.slice(1)
                          }
                          name={[name, campo]}
                          rules={[
                            { required: true, message: `Informe ${campo}` },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      ))}
                      <Form.Item
                        {...restField}
                        label="Complemento"
                        name={[name, "complemento"]}
                      >
                        <Input />
                      </Form.Item>
                    </Card>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      block
                      onClick={() => add(enderecoVazio)}
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
                gap: 8,
                marginTop: 16,
              }}
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

export default Pessoa;
