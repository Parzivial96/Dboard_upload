"use client";

import React, { useState } from 'react';
import MultiUpload from './upload';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Hardcoded credentials for demonstration purposes
    const validUsername = 'admin';
    const validPassword = 'EEE@2024';

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      onLoginSuccess(); // Call the onLoginSuccess callback
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
          <h2 className="login-title">Login</h2>
          <input className="input-field" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="welcome-message">
          <h2 className="welcome-title">Welcome, {username}!</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <MultiUpload />
        </div>
      )}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .login-form, .welcome-message {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }

        .login-title, .welcome-title {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
        }

        .login-button, .logout-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-button:hover, .logout-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;