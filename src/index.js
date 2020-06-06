import React from "react";
import ReactDOM from "react-dom";
import UrlParse from "url-parse";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";

const urlParser = new UrlParse(window.location.href, true);
let roomId = urlParser.query.roomId;

if (!roomId) {
  roomId = new Date().getTime();

  urlParser.query.roomId = roomId;
  window.history.pushState("", "", urlParser.toString());
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
