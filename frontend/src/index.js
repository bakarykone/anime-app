import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk"; // comme on a des actions qui sont asyncrones ce qui veut dire qu'on a des fonctions qui retourne des fonctions asyncrones

import reducers from "./reducers";

import App from "./App";
import "./index.css"

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
