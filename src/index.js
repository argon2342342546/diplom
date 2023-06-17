import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyleProvider  hashPriority="high">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyleProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
