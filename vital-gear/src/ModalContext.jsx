import React, { useEffect } from "react";
import { use } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import axios from "axios";

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

  const handleCart = () => setCartVisible(!cartVisible);

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

  //adminAccess
  const [isAdmin, setAdmin] = useState(false);

  //userProfile Id
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function verify() {
      console.log("HG modalProvider");
      const response = await axios.post(
        "http://localhost:3000/auth",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUserId(response.data.user._id);
        setFname(response.data.user.firstName);
        setLname(response.data.user.lastName);
        if (response.data.user.isAdmin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        addSignIn();
      }
    }

    verify();
  }, []);

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
        isAdmin,
        setAdmin,
        userId,
        setUserId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
