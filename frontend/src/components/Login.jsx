import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/userSlice";
import { loginUser } from "../api";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.successful === true) {
        dispatch(setCurrentUser({ email }));
        sessionStorage.setItem("currentUser", JSON.stringify({ email }));

        navigate("/Home/Index");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Error logging in: " + error);
    }
  };
  useEffect(() => {
    const rememberMeData = JSON.parse(localStorage.getItem("rememberMeData"));
    if (rememberMeData) {
      setEmail(rememberMeData.email);
      setPassword(rememberMeData.password);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (rememberMe) {
      const rememberMeData = JSON.stringify({ email, password });
      localStorage.setItem("rememberMeData", rememberMeData);
    } else {
      localStorage.removeItem("rememberMeData");
    }
  }, [rememberMe, email, password]);

  return (
    <div>
      <div className={styles["top-text"]}>
        <h1>JALA ACADEMY</h1>
        <hr className="width:50%;text-align:left;margin-left:0" />
        <h3>Login Credentials</h3>
        <p>Email: t.yadav12@gmail.com</p>
        <p>Password:123456</p>
      </div>
      <div className={styles["login-container"]}>
        <span>Sign In</span>
        <hr className="width:50%;text-align:left;margin-left:0" />
        <div className={styles["input-container"]}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles["remember-me-container"]}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember me</label>
        </div>
        <div className={styles["buttons-container"]}>
          <button className={styles["sign-in-button"]} onClick={handleSignIn}>
            Sign In
          </button>
          <button className={styles["forgot-password-button"]}>
            Forgot Password
          </button>
        </div>
        {currentUser && <p>Welcome, {currentUser.email}!</p>}
      </div>
      <br />
      <br />
      <div className={styles["bottom-text"]}>
        JALA Academy offers Job Guaranteed Programs for Freshers to 12 years’
        experience on Full Stack Development / Automation Testing / Dev-Ops /
        QA/ SDET/Cyber Security / RPA / Cloud Technologies. Training would be
        completely on live Project scenarios Read our website JALA Academy for
        more details : https://jalaacademy.com/
      </div>
    </div>
  );
};

export default Login;
