import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.jsx";
import { useModal } from "../ModalContext.jsx";
import {flash} from "react-universal-flash";

export default function SignIn() {
  const {
    isSignInVisible,
    handleCloseModal,
    addSignIn,
    setFname,
    setLname,
    pass,
    togglePass,
    isAdmin,
    setAdmin,
    setUserId,
  } = useModal();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To display error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors

    try {
      console.log("HG sending request");
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      ); // Send cookies

      if (response.status === 200) {
        setUserId(response.data.user._id);
        setFname(response.data.user.firstName);
        setLname(response.data.user.lastName);
        if (response.data.user.isAdmin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        console.log("admin status: ", isAdmin);
        // console.log("user: " + fname + " " + lname);
        addSignIn();
        handleCloseModal();
        // Show success message
        const localCartItems =
          JSON.parse(localStorage.getItem("cartItems")) || [];
        if (localCartItems.length > 0) {
          await axios.post(
            "http://localhost:3000/shopping/cart",
            { cartItems: JSON.stringify(localCartItems) },
            { withCredentials: true }
          );
          localStorage.removeItem("cartItems"); // Clear local storage after sending
        }
        alert(response.data.message);
        // Navigate to home page after login
        navigate("/");
        // flash("logged in!!", 5000, "success")
      }
      // console.log("Login successful:", response.data.user);
    } catch (err) {
      console.error("Login failed:", err); // Log the entire error object
      console.error("Error response:", err.response); // Log the response object if it exists
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div
        className={`w-[100%] h-[200rem] absolute top-0 bg-[black]/[0.2] ${
          isSignInVisible ? "block" : "hidden"
        }`}
        onClick={handleCloseModal}
      ></div>
      <div
        className={`fixed left-[50%] duration-500 -translate-x-1/2 -translate-y-1/2 mx-auto min-w-[500px] max-w-lg px-4 py-16 sm:px-6 lg:px-8 ${
          isSignInVisible ? "top-[50%]" : "top-[-50%]"
        }`}
      >
        <form
          onSubmit={handleLogin}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-[#dae0ef]"
        >
          <p className="text-center text-lg font-semibold">
            Sign in to your account
          </p>

          <div>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email or phone number"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={pass ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                minLength={8}
                required
              />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                onClick={togglePass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="block w-full rounded-lg bg-[#09274d] px-5 py-3 text-sm font-semibold text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <a className="underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
