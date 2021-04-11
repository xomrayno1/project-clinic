import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/style.css'
import {registerAction} from '../../redux/action/authAction'
import {
    useHistory
} from 'react-router-dom'
import {Spin} from 'antd';
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';

export default function Register(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {isLoading} = useSelector(state => state.auth);
    // const [register, setRegister] = useState({
    //     username : '',
    //     password : '',
    //     email: ''
    // })
    const registerSchema = Yup.object({
        username: Yup.string().required("Vui lòng điền tài khoản"),
        password: Yup.string().required("Vui lòng điền mật khẩu"),
        email: Yup.string().required("Vui lòng điền email"),
    })  
    const registerRef = useRef();
  
    function handleOnSubmit(){
        dispatch(registerAction(registerRef))
    }
    
 
    return (
        <Spin tip="Loading..." spinning={isLoading} >
        <div class="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Đăng ký tài khoản</h5>
                    <Formik
                        initialValues={{
                            username : '',
                            password : '',
                            email: ''
                        }}
                        validationSchema={registerSchema}
                        onSubmit={handleOnSubmit}
                        innerRef={registerRef}
                        validateOnBlur={false}
                        validateOnChange={false}
                    > 
                        {
                            ({errors, touched}) => (
                                <Form className="form-signin"  >
                                    <div className="form-label-group">
                                        <Field type="text" id="inputUsername" 
                                            name="username"
                                            className="form-control" 
                                            placeholder="Tên tài khoản"  autofocus/>
                                        <ErrorMessage  component="div" name="username"  className="error-text" />
                                    </div>
                                    <div className="form-label-group">
                                        <Field type="password" 
                                            id="password" 
                                            name="password"
                                            className="form-control"
                                            placeholder="Mật khẩu" />
                                        <ErrorMessage  component="div" name="password" className="error-text"/>
                                    </div>
                                    <div className="form-label-group">
                                        <Field type="email" 
                                            id="email" 
                                            name="email"
                                            className="form-control"
                                            placeholder="Địa chỉ email" />
                                        <ErrorMessage component="div"  name="email" className="error-text" />
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Đăng ký</button>
                                    <hr className="my-4"/>
                               </Form>
                            )
                        }
                    </Formik>
                    <div className="text-right">
                        <Link to="/login"  >
                            Đã có tài khoản
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