import { initialize } from "react-ga";

const TRACKING_ID = "G-2TKQDBFPL5";
initialize(TRACKING_ID);
import { HelmetProvider } from 'react-helmet-async';
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants";
import "./index.css";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
