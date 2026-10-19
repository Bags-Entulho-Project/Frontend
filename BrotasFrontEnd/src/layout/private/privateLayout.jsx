import { Button, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  useCheckSessionMutation,
  useLogoutMutation,
} from "../../store/slices/auth/queries";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { changeIsAuthenticate, logout } from "../../store/slices/auth/login";
import { LogOut } from "lucide-react";
import { persistor } from "../../store/config/configure";

function privateLayout({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const location = useLocation();
  const [checkSession] = useCheckSessionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchLogOut] = useLogoutMutation();
  const checkAuthentication = useCallback(async () => {
    try {
      await checkSession().unwrap();

      dispatch(changeIsAuthenticate(true));
    } catch (err) {
      dispatch(changeIsAuthenticate(null));
      return;
    }
  }, [location]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleLogout = async () => {
    fetchLogOut().unwrap().then(async () => {
      dispatch(logout());

      await persistor.flush();
      await persistor.purge();

      navigate("/login");
    });
  };

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
    },
  ];

  const selectedKey = items.find(
    (item) => item.name === location.pathname,
  )?.key;

  return isAuthenticated ? (
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
        <div
          style={{
            marginLeft: "-110vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={<LogOut color="white" cursor="pointer" />}
            onClick={() => handleLogout()}
          />
        </div>
      </Header>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <Footer style={{ textAlign: "center", backgroundColor: "#001529" }}>
        footer
      </Footer>
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default privateLayout;
