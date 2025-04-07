import React from 'react';
import { Link } from 'react-router-dom';  // For navigation
import { useRef } from "react";
import About from '../components/About/About';
import Information from '../components/Information/Information';
import Login from '../components/Login/Login';
import Logodiv from '../components/LogoDiv/Logodiv';
import Price from '../components/Price/Price';
import Footer from '../components/Footer/Footer';

export default function LoginPage() {
  const loginRef = useRef(null);
  return (
    <div id="main">
        <Logodiv loginRef={loginRef}/>
        <About />
        <Price />
        <Login ref={loginRef}/>
        <Information />
        <Footer />
    </div>
  );
}


