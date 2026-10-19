import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

function publicLayout({children}){
return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div>
          <h1 style={{ color: "white" }}>Sistema de Gestão de Bags - SGB</h1>
        </div>
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

export default publicLayout;