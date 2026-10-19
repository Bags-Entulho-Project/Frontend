import { App, ConfigProvider } from "antd";
import PrivateLayout from "./privateLayout";
import { Outlet } from "react-router-dom";

function privatePageLayout() {
  return (
    <>
      <ConfigProvider>
        <App>
          <PrivateLayout>
            <Outlet />
          </PrivateLayout>
        </App>
      </ConfigProvider>
    </>
  );
}

export default privatePageLayout;
