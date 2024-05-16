import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const imgurl = require("../media/logo1000.png");
  const imgurl1 = require("../media/ace1.jpg");
  const handleLogin=()=>{
    navigate('/dashboard')
  }
  return (
    <div className="Login">
     
      <div >
       
        <div className="login-container">
          <div className="logo">
            <img src={imgurl} style={{width:'105%', height:'60.5%'}} alt = 'Logo'/>
            </div>
            <div className="logor">
              
            {/* <img src={imgurl1} style={{width:'80%', height:'72.5%'}} alt = 'Logo'/> */}
            </div>
          <div className="form-container">
            <h1 style={{paddingRight:'65%'}}>Sign in </h1>
            {/* <p>by FocusR AI</p> */}
            <div className="form-group">
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group">
                <div className="password-input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <EyeOutlined className="eye-icon" />
                </div>
              </div>
              <div className="additional-options">
                <label>
                  <input type="checkbox" name="rememberMe" />
                  Remember Me
                </label>
                <Link to="/forgotPassword" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <Button
                className="log-button"
                type="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
