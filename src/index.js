import React from "react";
import ReactDOM from "react-dom";
import UrlParse from "url-parse";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import 'bootstrap/dist/css/bootstrap.min.css';


Object.defineProperty(navigator, 'userAgent', {
  get: function () { return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"; }
});

const urlParser = new UrlParse(window.location.href, true);
let roomId = urlParser.query.roomId;
let displayName = urlParser.query.displayName;
// || (cookiesManager.getUser() || {}).displayName;

if (!roomId) {
  roomId = new Date().getTime();

  urlParser.query.roomId = roomId;
  window.history.pushState("", "", urlParser.toString());
}

console.log(`urlParser-----`, urlParser);

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
