import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import '../styles/Login.css';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginValues = { email, password };

    try {
      const response = await api.post("http://localhost:8080/identity/auth/token", loginValues);

      if (response.data && response.data.result) {
        const { token } = response.data.result;

        if (!token) {
          console.error("Token not found in response");
          return;
        }

        localStorage.setItem("token", token);
        const decodedPayload = decodeToken(token);
        console.log(decodedPayload);
        console.log(token);
        const user = {
          address: decodedPayload.address,
          email: decodedPayload.email,
          exp: decodedPayload.exp,
          iat: decodedPayload.iat,
          iss: decodedPayload.iss,
          phoneNumber: decodedPayload.phoneNumber,
          roles: decodedPayload.roles,
          scope: decodedPayload.scope,
          sub: decodedPayload.sub,
          userID: decodedPayload.userID,
          username: decodedPayload.username,
        };

        localStorage.setItem("user", JSON.stringify(user));
        console.log("Infor", user);
        
        const { roles } = decodedPayload;
        if (roles.includes('ADMIN')) {
          navigate('/admin-user-management');
        } else if (roles.includes('BUYER')) {
          navigate('/');  // Navigate to profile page after login
        } else {
          setError("Tài khoản hoặc mật khẩu sai");
        }
        window.location.reload();
      } else {
        setError("Tài khoản hoặc mật khẩu sai");
      }

    } catch (error) {
      setError("Tài khoản hoặc mật khẩu sai");
      console.error("Login error:", error.response ? error.response.data : error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <input
              className="form-input"
              placeholder=" "
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>

          <div className="form-field password-field">
            <input
              className="form-input"
              placeholder=" "
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-password">Quên mật khẩu?</div>
          {error && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</div>}

          <button type="submit" className="login-btn">
            Đăng Nhập
          </button>
        </form>
        <div className="signup-link">
          Bạn chưa có tài khoản? <Link to="/signup">Đăng kí tại đây</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
