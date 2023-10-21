import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Game from "./Game.tsx";
import ToastifyDemo from "./components/ToastifyDemo.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Game /> */}
    <App />
    {/* <ToastifyDemo /> */}
  </React.StrictMode>
);
