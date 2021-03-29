import React from 'react';
import './styles/style.css'
 

export default function Login(props) {
     
    return (
        <div class="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Đăng Nhập</h5>
                    <form className="form-signin">
                    <div className="form-label-group">
                        <input type="email" id="inputEmail" className="form-control" 
                        placeholder="Email address" required autofocus/>
                    </div>

                    <div className="form-label-group">
                        <input type="password" id="inputPassword" className="form-control"
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
    );
    
}