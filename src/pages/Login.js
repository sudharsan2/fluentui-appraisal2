// import React, { useEffect, useState } from "react";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, notification } from "antd";
// import { EyeOutlined } from '@ant-design/icons';
// import useIsMountedRef from "../hooks/useIsMountedRef";
// import "./login.css";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLoginDetailsAsync, getIsAuthenticatedFromAuth, getIsLoadingFromAuth, getErrorFromAuth } from '../Store/authSlice';
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isMountedRef = useIsMountedRef();
//   const isLoading = useSelector(getIsLoadingFromAuth);
//   const isAuthenticated = useSelector(getIsAuthenticatedFromAuth);
//   const isError = useSelector(getErrorFromAuth);
//   const [showPassword, setShowPassword] = useState(false);

//   const LoginSchema = Yup.object({
//     username: Yup.string().required("Username is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },

//     validationSchema: LoginSchema,
//     onSubmit: async (values, { setErrors, setSubmitting }) => {
//       try {
//         const response = await dispatch(fetchLoginDetailsAsync(values));
//         if (response.payload && response.payload.accessToken) {
//           localStorage.setItem('accessToken', response.payload.accessToken);
//         }
//       } catch (error) {
//         console.error("Login failed:", error);
//         setErrors({ auth: isError || "An error occurred during login." });
//         setSubmitting(false);
//         if (isMountedRef.current) {
//           notification.error({
//             message: "Login Failed",
//             description: isError || "An error occurred during login.",
//           });
//         }
//       }
//     },
//   });

//   useEffect(() => {
//     if (isAuthenticated === 2) {
//       const rolesString = localStorage.getItem("role");
//       const accessToken = localStorage.getItem("accessToken");

//       if (accessToken) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//       }

//       if (rolesString.includes("HR")) {
//         navigate("/hremployee");
//       } else if (rolesString.includes("Manager")) {
//         navigate("/mgappraisal");
//       } else if (rolesString.includes("Reviewer")) {
//         navigate("/rvreviewer");
//       } else if (rolesString.includes("Manager") && rolesString.includes("Reviewer")) {
//         // Add specific navigation if needed
//       } else {
//         navigate("/hrdashboard");
//         // console.log(rolesString)
//       }

//       notification.success({
//         message: "Login Successful",
//         description: "You have successfully logged in.",
//       });
//     } else if (isAuthenticated === 3) {
//       notification.error({
//         message: "Login Failed",
//         description: isError || "An error occurred during login.",
//       });
//     }
//   }, [isAuthenticated, navigate, isError]);

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="Login">
//       <div className="login-container">
//         <div className="form-container">
//           <h1>Sign in</h1>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your username"
//                 value={formik.values.username}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched.username && formik.errors.username && (
//                 <div className="error">{formik.errors.username}</div>
//               )}
//             </div>
//             <div className="form-group">
//               <div className="password-input">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                 />
//                 <EyeOutlined
//                   onClick={handleTogglePassword}
//                   className="eye-icon"
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="error">{formik.errors.password}</div>
//                 )}
//               </div>
//             </div>
//             <div className="additional-options">
//               <label>
//                 <input type="checkbox" name="rememberMe" />
//                 Remember Me
//               </label>
//               <Link to="/forgotPassword" className="forgot-password">
//                 Forgot Password?
//               </Link>
//             </div>
//             <Button
//               className="log-button"
//               type="primary"
//               htmlType="submit"
//               loading={isLoading}
//               disabled={formik.isSubmitting}
//             >
//               Login
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Alert, Button, notification } from "antd";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { fetchLoginDetailsAsync, getIsAuthenticatedFromAuth, getIsLoadingFromAuth, getErrorFromAuth } from '../Store/authSlice';
import useIsMountedRef from "../hooks/useIsMountedRef";
import { useSelector } from "react-redux";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
 
const Login = () => {
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        dispatch(fetchLoginDetailsAsync(values));
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        console.log("error")
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          // Show error notification
          notification.error({
            message: "Login Failed",
            description: isError || "An error occurred during login.",
          });
        }
      }
    },
  });

  useEffect(() => {
    const rolesString = localStorage.getItem("role");
    if (isAuthenticated === 2) {
      if (rolesString.includes("HR")) {
            navigate("/hremployee");
          } else if (rolesString.includes("Manager")) {
            navigate("/mgappraisal");
          } else if (rolesString.includes("Reviewer")) {
            navigate("/rvreviewer");
          } else if (rolesString.includes("Manager") && rolesString.includes("Reviewer")) {
            // Add specific navigation if needed
          } else {
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
  }, [isAuthenticated, navigate]);
 
  const imgurl1 = process.env.PUBLIC_URL + "./img/bg_3.mp4";
  const imgurl2 = process.env.PUBLIC_URL + "./img/login3.jpg";
 
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:9000/user/signin",
        {
          username: formik.values.username,
          password: formik.values.password
        }
      );
 
      const token = response.data.tokens.access_token;
 
      localStorage.setItem("accessToken", response.data.tokens.access_token);
      const { exp, role,name, username, email, empId } = jwtDecode(response.data.tokens.access_token);
      localStorage.setItem("role", role);
      localStorage.setItem("empId", empId)
      localStorage.setItem("username", username);
      localStorage.setItem("mail", email);
      localStorage.setItem("name", name);
      if (role.includes("HR")) {
        navigate("/hremployee");
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
      }
      else if (role.includes("Manager")) {
        navigate("/mgappraisal");
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
      }
      else if (role.includes("Reviewer")) {
        navigate("/rvreviewer");
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
      }
      else{
        navigate("/");
        notification.error({
          message: "Login Failed",
          description: "Invalid Credentials, Please check Your Credentials again  🥹",
        });
      }
      
    } catch (exception) {
      notification.error({
        message: "Login Failed",
        description: "Invalid Credentials, Please check Your Credentials again  🥹",
      })
    }
  }
 
  return (
    <div className="Login">
      <div className="login-container">
        <div className="form-container">
          <h1>Sign in</h1>
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
                  {showPassword ? (
                    <EyeInvisibleOutlined
                      onClick={handleTogglePassword}
                      className="eye-icon"
                    />
                  ) : (
                    <EyeOutlined
                      onClick={handleTogglePassword}
                      className="eye-icon"
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
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
                loading={isLoading}
                disabled={formik.isSubmitting}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      
  );
};
 
export default Login;