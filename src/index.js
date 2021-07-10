import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "typeface-alegreya-sans";
import "typeface-alegreya-sc";
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

ReactDOM.render(
  //changed React.StrictMode to React.Fragment
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
