import { Breadcrumb, ConfigProvider, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

function DefaultLayout({ children }) {
  const location = useLocation();

  const items = [
    {
      key: "0",
      label: <Link to="/home">Home</Link>,
      name: "/home",
    },
    {
      key: "1",
      label: <Link to="/pessoa">Pessoa</Link>,
      name: "/pessoa",
    },
    {
      key: "2",
      label: <Link to="/bag">Bag</Link>,
      name: "/bag",
    },
    { 
      key: "3",
      label: <Link to="/alocacao">Alocação</Link>,
      name: "/alocacao",
    }
  ];

  const selectedKey = useMemo(() => {
    const pathMap = items.reduce((acc, item) => {
      acc[item.name] = item.key;
      return acc;
    }, {});

    return pathMap[location.pathname];
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div>
          <h1 style={{ color: "white" }}>Sistema de Gestão de Bags - SGB</h1>
        </div>
        <Menu
          mode="horizontal"
          items={items}
          theme="dark"
          selectedKeys={[selectedKey]}
        />
      </Header>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <Footer style={{ textAlign: "center", backgroundColor: "#001529" }}>
        footer
      </Footer>
    </Layout>
  );
}

export default DefaultLayout;
