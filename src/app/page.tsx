"use client";

//import Image from "next/image";
import React, { useState } from 'react';
import LoginPage from './login';

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
          <h1>Welcome to the MultiUpload Page!</h1>
          <button onClick={handleLogout}>Logout</button>
          <MultiUpload />
        </>
      )}
    </div>
  );
}