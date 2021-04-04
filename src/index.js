 
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'antd/dist/antd.css';
import AdminLayout from "layouts/Admin.js";
import Login from "components/Auth/Login";
import Register from 'components/Auth/Register'

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route  path="/login"  render={() => <Login/> }/>
      <Route  path="/register" render={() => <Register/> } />
      <Route  path="/admin" render={(props) => <AdminLayout {...props} />} />
      {/* <Redirect to="/admin/dashboard" /> */}
      <Redirect to="/login" from="/logout"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
