import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const handleLoginClick = () => setIsSignInVisible(true);

  const handleCloseModal = () => setIsSignInVisible(false);

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignUpClick = () => setIsSignUpVisible(true);

  const handleSignUpModal = () => setIsSignUpVisible(false);

  const [userInfo, setUserInfo] = useState(false);

  const [cartVisible, setCartVisible] = useState(false);

  const handleCartClick = () => setCartVisible(true);

  const handleCart = () => setCartVisible(false);

  const [isSignIn, setSignIn] = useState(false);
  // const signInUser = () => setSignIn(true);
  // const removeSignIn = () => setSignIn(false);

  return (
    <ModalContext.Provider
      value={{
        isSignInVisible,
        handleLoginClick,
        handleCloseModal,
        isSignUpVisible,
        handleSignUpClick,
        handleSignUpModal,
        userInfo,
        cartVisible,
        handleCartClick,
        handleCart,
        isSignIn,
        setSignIn,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
