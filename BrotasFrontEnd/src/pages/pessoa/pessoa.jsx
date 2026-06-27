import { Card, Layout, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { useSelector, useDispatch } from "react-redux";


function pessoa() {
    const dispatch = useDispatch();
    const pessoas = useSelector((state) => state.pessoa);


  const data = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <Layout className="card-pessoa">
        <Content>
          <Card title="Tabela de Pessoas"  classNames={{header:"card-pessoa-head"}}>
            <Table
              dataSource={data}
              columns={columns} style={{width: "130vh"}}
            />
          </Card>
        </Content>
      </Layout>
    </>
  );
}

export default pessoa;
