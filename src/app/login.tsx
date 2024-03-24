"use client";

import React, { useState } from 'react';
import MultiUpload from './upload';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Hardcoded credentials for demonstration purposes
    const validUsername = 'admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'} Password</button>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="welcome-message">
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <MultiUpload />
        </div>
      )}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .login-form {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .password-input {
          position: relative;
        }

        .password-input input {
          margin-bottom: 10px;
          padding: 8px;
          width: calc(100% - 40px);
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .password-input button {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #007bff;
        }

        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
