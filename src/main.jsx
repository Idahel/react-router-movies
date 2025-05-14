import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/moviedetails.css";
import "./styles/movies.css";
import "./styles/header.css";
import "./styles/nav.css";
import "./styles/collectiondetails.css";
import "./styles/collections.css";

import { App } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
