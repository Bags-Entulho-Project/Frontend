import { Breadcrumb, ConfigProvider, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

function DefaultLayout({ children }) {
  return (
    <Layout>
      <Header>adasda</Header>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default DefaultLayout;
