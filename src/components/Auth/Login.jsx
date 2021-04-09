import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/style.css'
import {loginAction} from '../../redux/action/authAction'
import {
    useHistory
} from 'react-router-dom'
import {Spin} from 'antd';

export default function Login(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const  auth = useSelector(state => state.auth);
    const {isLoading,isLogin} = auth || {isLoading: false, isLogin: false}
    const [login, setLogin] = useState({
        username : '',
        password : ''
    })
    function onChangeLogin(e){
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }
    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(loginAction(login))
    }
    if(isLogin){
        history.push("/admin/dashboard")
    }

  
 
    return (
        <Spin tip="Loading..." spinning={isLoading} >
        <div class="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Đăng Nhập</h5>
                    <form className="form-signin" onSubmit={handleOnSubmit}>
                    <div className="form-label-group">
                        <input type="text" id="inputEmail" 
                            onChange={onChangeLogin}
                            name="username"
                            className="form-control" 
                            placeholder="Email address" required autofocus/>
                    </div>

                    <div className="form-label-group">
                        <input type="password" 
                            onChange={onChangeLogin}
                            id="password" 
                            name="password"
                            className="form-control"
                            placeholder="Password" required/>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" for="customCheck1">Remember password</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Đăng Nhập</button>
                    <hr className="my-4"/>
                    <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                    <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </Spin>
        
    );
    
}