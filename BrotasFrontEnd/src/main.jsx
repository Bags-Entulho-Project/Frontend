import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Apps from "./App.jsx";
import { App, ConfigProvider } from "antd";
import { persistor, store } from "./store/config/configure.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
          <PersistGate loading={null} persistor={persistor}>
            <App>
              <Apps />
            </App>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
);
