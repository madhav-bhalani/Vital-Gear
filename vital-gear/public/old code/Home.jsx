import React, { useState } from "react";
import Header from "./Components/Header";
import SignIn from "./Components/SignIn";
import "./App.css";
import SignUp from "./Components/SignUp";
import Carousel from "./Components/Carousel";
import Features from "./Components/Features";
import BestSelling from "./Components/BestSelling";
import Footer from "./Components/Footer";


const App = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const handleLoginClick = () => {
    setIsSignInVisible(true);
  };

  const handleCloseModal = () => {
    setIsSignInVisible(false);
  };

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpVisible(true);
  };

  const handleSignUpModal = () => {
    setIsSignUpVisible(false);
  };

  const images = ["/carousel/1.png", "/carousel/2.png", "/carousel/3.png"];

  return (
    <div>
      <Header
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
      />

      <Carousel images={images} />
      <Features />
      <BestSelling />
      <Footer />

      <SignIn isVisible={isSignInVisible} onClose={handleCloseModal} />
      <SignUp isVisible={isSignUpVisible} onClose={handleSignUpModal} />
    </div>
  );
};

export default App;
