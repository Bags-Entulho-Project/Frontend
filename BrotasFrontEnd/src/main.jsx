import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { store } from './store/config/configure.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider>
      <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
