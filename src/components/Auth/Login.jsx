import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/style.css'
import {loginAction} from '../../redux/action/authAction'
import {
    useHistory
} from 'react-router-dom'
import {Spin} from 'antd';
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';

export default function Login(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const  auth = useSelector(state => state.auth);
    const {isLoading,isLogin} = auth || {isLoading: false, isLogin: false}
    const loginRef = useRef();
    const loginSchema = Yup.object({
        username : Yup.string().required("Vui lòng điền tài khoản "),
        password: Yup.string().required("Vui lòng điền mật khẩu ")
    })
 
    function handleOnSubmit(){
        dispatch(loginAction(loginRef))
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
                    <Formik
                        initialValues={{
                            username : '',
                            password: ''
                        }}
                        onSubmit={handleOnSubmit}
                        validationSchema={loginSchema}
                        innerRef={loginRef}
                        validateOnBlur={false}
                        validateOnChange={false}
                    > 
                        <Form className="form-signin"  >
                        <div className="form-label-group">
                            <Field type="text" id="inputEmail" 
                                name="username"
                                className="form-control" 
                                placeholder="Tên tài khoản"   autofocus/>
                            <ErrorMessage  component="div" name="username" className="error-text"/>
                        </div>

                        <div className="form-label-group">
                            <Field type="password" 
                                id="password" 
                                name="password"
                                className="form-control"
                                placeholder="Mật khẩu"  />
                            <ErrorMessage  component="div" name="password" className="error-text"/>
                        </div>

                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            {/* <label className="custom-control-label" for="customCheck1">Remember password</label> */}
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Đăng Nhập</button>
                        <hr className="my-4"/>
                        {/* <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button> */}
                        </Form>
                    </Formik>
                    <div className="text-right">
                        <Link to="/register"    >
                                Chưa có tài khoản
                        </Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </Spin>
    );
    
}