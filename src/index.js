import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

import { createGlobalStyle } from "styled-components";
import $ from "jquery";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: lightblue;
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);

$(document).bind("DOMNodeRemoved", function (e) {
  console.log("Removed: " + e.target.nodeName);
});
