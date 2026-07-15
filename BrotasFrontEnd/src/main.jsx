import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Apps from "./App.jsx";
import { App, ConfigProvider } from "antd";
import { store } from "./store/config/configure.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#001529",
          },
        },
      }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App>
            <Apps />
          </App>
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
