import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import '../src/AppRoutes/Invoice/Invoice.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import App from "./AppRoutes/App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <div className="container-fluid bg-light">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </>
);
