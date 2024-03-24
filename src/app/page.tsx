"use client";

//import Image from "next/image";
import React, { useState } from 'react';
import LoginPage from './login';
import MultiUpload from './upload'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <div className="welcome">
              <h1>Welcome Admin!</h1>
              <button onClick={handleLogout}>Logout</button>
          </div>
          <MultiUpload />
        </>
      )}
    </div>
  );
}