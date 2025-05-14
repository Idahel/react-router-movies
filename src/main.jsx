import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/moviedetails.css";
import "./styles/movies.css";
import "./styles/header.css";
import "./styles/nav.css";

import { App } from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
