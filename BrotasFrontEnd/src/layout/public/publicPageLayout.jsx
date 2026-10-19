import { App, ConfigProvider } from "antd";
import PublicLayout from "./publicLayout";
import { Outlet } from "react-router-dom";

function publicPageLayout() {
  return (
    <>
      <ConfigProvider>
        <App>
          <PublicLayout>
            <Outlet />
          </PublicLayout>
        </App>
      </ConfigProvider>
    </>
  );
}

export default publicPageLayout;
