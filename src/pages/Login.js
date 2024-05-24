import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button, notification } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import useIsMountedRef from "../hooks/useIsMountedRef";
import "./login.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginDetailsAsync, getIsAuthenticatedFromAuth, getIsLoadingFromAuth, getErrorFromAuth } from '../Store/authSlice';
 
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const isLoading = useSelector(getIsLoadingFromAuth);
  const isAuthenticated = useSelector(getIsAuthenticatedFromAuth);
  const isError = useSelector(getErrorFromAuth);
  const [showPassword, setShowPassword] = useState(false);
 
  const LoginSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
 
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
 
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await dispatch(fetchLoginDetailsAsync(values));
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ auth: isError || "An error occurred during login." });
        setSubmitting(false);
        if (isMountedRef.current) {
          notification.error({
            message: "Login Failed",
            description: isError || "An error occurred during login.",
          });
        }
      }
    },
  });
 
  useEffect(() => {
    if (isAuthenticated === 2) {
      const rolesString = localStorage.getItem("role");
     
  
      if (rolesString.includes("HR")) {
        navigate("/hremployee");
      } else if (rolesString.includes("Manager")) {
        navigate("/mgappraisal");
      } else if (rolesString.includes("Reviewer")) {
        navigate("/kanban-interviewer");
      } else if (rolesString.includes("Manager") && rolesString.includes("Reviewer")) {
        
        
      }else {
        navigate("/hrdashboard");
        // console.log(rolesString)
      }
  
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in.",
      });
    } else if (isAuthenticated === 3) {
      notification.error({
        message: "Login Failed",
        description: isError || "An error occurred during login.",
      });
    }
  }, [isAuthenticated, navigate, isError]);
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
 
  return (
    <div className="Login">
      <div className="login-container">
        <div className="form-container">
          <h1>Sign in</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error">{formik.errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <EyeOutlined
                  onClick={handleTogglePassword}
                  className="eye-icon"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
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
              htmlType="submit"
              loading={isLoading}
              disabled={formik.isSubmitting}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
 