import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import AdminLayout from "layouts/Admin.js";
import { useSelector } from 'react-redux';

function App(props) {
    const auth = useSelector(state => state.auth);
    const { isLogin } = auth || { isLogin: false }
    return (
        <Switch>
            <Route  path="/login"  render={() => <Login/> }/>
            <Route  path="/register" render={() => <Register/> } />
            <Route  path="/admin" render={(props) => isLogin ?  <AdminLayout {...props} /> : <Redirect to="/login" /> }  />
            {/* <Redirect to="/admin/dashboard" /> */}
            <Redirect to="/login" from="/logout"/>
        </Switch>
    );
}

export default App;