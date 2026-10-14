import {
  App as AntApp,
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
import { useState } from "react";
import { useSelector } from "react-redux";
import { CirclePlus } from "lucide-react";
import {
  useAlterarStatusAlocacaoMutation,
  useAtualizarAlocacaoMutation,
  useCriarAlocacaoMutation,
  useDevolverAlocacaoMutation,
  useGetAlocacoesQuery,
  useGetBagsQuery,
  useGetPessoasQuery,
} from "../../store/services/catalogApi";

const errorMessage = (error) =>
  error?.data?.message ||
  error?.data ||
  "Não foi possível concluir a operação.";
const formatarData = (data) =>
  data &&
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(data));

function Alocacao() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPessoaId, setSelectedPessoaId] = useState(null);
  const [selectedBagId, setSelectedBagId] = useState(null);
  const [form] = Form.useForm();
  const { message } = AntApp.useApp();
  const pessoas = useSelector((state) => state.pessoa.pessoa);
  const bags = useSelector((state) => state.bag.bag);
  const { data: alocacoes = [], isFetching } = useGetAlocacoesQuery();
  useGetPessoasQuery();
  useGetBagsQuery();
  const [criarAlocacao] = useCriarAlocacaoMutation();
  const [atualizarAlocacao] = useAtualizarAlocacaoMutation();
  const [devolverAlocacao] = useDevolverAlocacaoMutation();
  const [alterarStatusAlocacao] = useAlterarStatusAlocacaoMutation();

  const closeDrawer = () => {
    form.resetFields();
    setIsOpen(false);
    setIsEditing(false);
    setSelectedPessoaId(null);
    setSelectedBagId(null);
  };
  const abrirNovo = () => {
    form.resetFields();
    setIsEditing(false);
    setIsOpen(true);
  };
  const editar = (alocacao) => {
    form.setFieldsValue({
      id: alocacao.id,
      pessoaId: alocacao.pessoaId,
      bagId: alocacao.bagId,
    });
    setSelectedPessoaId(alocacao.pessoaId);
    setSelectedBagId(alocacao.bagId);
    setIsEditing(true);
    setIsOpen(true);
  };
  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await atualizarAlocacao(values).unwrap();
        message.success("Alocação atualizada.");
      } else {
        await criarAlocacao(values).unwrap();
        message.success("Alocação registrada.");
      }
      closeDrawer();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };
  const devolver = async (alocacao) => {
    try {
      await devolverAlocacao({
        id: alocacao.id,
      }).unwrap();
      message.success("Devolução registrada.");
    } catch (error) {
      message.error(errorMessage(error));
    }
  };
  const inativar = async (id) => {
    try {
      await alterarStatusAlocacao(id).unwrap();
      message.success("Alocação inativada.");
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const pessoasDisponiveis = pessoas.filter(
    (pessoa) =>
      pessoa.quantidadeAlocacoes < 2 || pessoa.id === selectedPessoaId,
  );
  const bagsDisponiveis = bags.filter(
    (bag) => bag.disponivel || bag.id === selectedBagId,
  );
  const columns = [
    {
      title: "Pessoa",
      dataIndex: "pessoaId",
      render: (id) =>
        pessoas.find((pessoa) => pessoa.id === id)?.nome || `Pessoa #${id}`,
    },
    {
      title: "Bag",
      dataIndex: "bagId",
      render: (id) => bags.find((bag) => bag.id === id)?.numero || `Bag #${id}`,
    },
    { title: "Entrega", dataIndex: "entrega", render: formatarData },
    {
      title: "Devolução",
      dataIndex: "devolucao",
      render: (data) => formatarData(data) || "Pendente",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (status === "devolvida" ? "Devolvida" : "Alocada"),
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
              <Button
                size="small"
                disabled={Boolean(record.devolucao)}
                onClick={() => editar(record)}
              >
                Editar
              </Button>
              <Button
                size="small"
                disabled={Boolean(record.devolucao)}
                onClick={() => devolver(record)}
              >
                Devolver
              </Button>
              <Button size="small" danger onClick={() => inativar(record.id)}>
                Inativar
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
          title="Tabela de Alocações"
          classNames={{ header: "card-table-head" }}
          extra={
            <Button type="primary" onClick={abrirNovo}>
              Novo
            </Button>
          }
        >
          <Table
            dataSource={alocacoes}
            columns={columns}
            rowKey="id"
            loading={isFetching}
            style={{ width: "130vh" }}
          />
        </Card>
        <Drawer
          title={isEditing ? "Editar Alocação" : "Adicionar Alocação"}
          open={isOpen}
          onClose={closeDrawer}
          size={420}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Pessoa"
              name="pessoaId"
              rules={[{ required: true, message: "Informe a pessoa" }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="Selecione uma pessoa"
                onChange={setSelectedPessoaId}
                options={pessoasDisponiveis.map((pessoa) => ({
                  label: `${pessoa.nome} (${pessoa.quantidadeAlocacoes}/2)`,
                  value: pessoa.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Bag"
              name="bagId"
              rules={[{ required: true, message: "Informe uma bag" }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="Selecione uma bag"
                onChange={setSelectedBagId}
                options={bagsDisponiveis.map((bag) => ({
                  label: bag.numero,
                  value: bag.id,
                }))}
              />
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

export default Alocacao;
