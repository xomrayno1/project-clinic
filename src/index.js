 
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'antd/dist/antd.css';
import App from 'App'
import {Provider, useSelector} from 'react-redux'
import store from './redux/store'

const hist = createBrowserHistory();
 
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
        <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);
