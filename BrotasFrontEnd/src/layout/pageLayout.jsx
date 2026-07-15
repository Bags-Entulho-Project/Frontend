import { App, ConfigProvider } from "antd";
import DefaultLayout from "./defaultLayout";
import { Outlet } from "react-router-dom";

function pageLayout() {
  return (
    <>
      <ConfigProvider>
        <App>
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        </App>
      </ConfigProvider>
    </>
  );
}

export default pageLayout;
