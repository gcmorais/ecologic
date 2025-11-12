import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalStyle from "./globalStyles";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);