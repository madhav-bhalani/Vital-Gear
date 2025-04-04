import React from "react";
import { use } from "react";
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
  const addSignIn = () => setSignIn(true);
  const removeSignIn = () => setSignIn(false);

  //for profile initials
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  //for single product
  // const [productId, setProductId] = useState("");

  //password view hide
  const [pass, setPass] = useState(false);
  const togglePass = () => setPass(!pass);

  //breadCrumb
  const [bread, setBread] = useState(false);
  const toggleBread = () => setBread(!bread);

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
        addSignIn,
        removeSignIn,
        setFname,
        setLname,
        fname,
        lname,
        setIsSignInVisible,
        // productId,
        // setProductId,
        pass,
        togglePass,
        bread,
        toggleBread,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
