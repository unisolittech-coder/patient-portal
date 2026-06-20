import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from 'react-toastify'

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);