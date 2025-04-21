import React, { useState } from "react";
import axios from "axios";
import "./SignUp.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "../ModalContext.jsx";


export default function SignUp() {
  const { isSignUpVisible, handleSignUpModal, setIsSignInVisible, pass, togglePass } = useModal();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [error, setError] = useState(null); // To display error messages
  
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors

    try{
      const response = await axios.post("http://localhost:3000/register",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          confirmPass
        },
      );

      handleSignUpModal();
      alert(response.data.message); // Show success message
      navigate("/");
      setIsSignInVisible(true)
    }
    catch(err){
      console.error("Login failed:", err); // Log the entire error object
      console.error("Error response:", err.response); // Log the response object if it exists
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div
        className={`w-[100%] h-[100%] absolute top-0 bg-[black]/[0.2] ${
          isSignUpVisible ? "block" : "hidden"
        }`}
        onClick={handleSignUpModal}
      ></div>
      <div
        className={` fixed left-[50%] duration-500 -translate-x-1/2 -translate-y-1/2 mx-auto max-w-screen-lg px-4 py-16 sm:px-6 lg:px-8 ${
          isSignUpVisible ? "top-[50%]" : "top-[-50%]"
        }`}
      >
        <form
          onSubmit={handleSignUp}
          className=" bg-[#dae0ef] mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <h1 className="text-center text-2xl font-bold text-[#09274d] sm:text-3xl">
            Get started today
          </h1>

          {/* <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Sign in to VitalGear to access premium health supplements and
            stylish gym clothing. Join our fitness community and start your
            journey to a healthier, fitter you!
          </p> */}
          <p className="text-center text-lg font-semibold">Create Account</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <div className="relative">
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter phone number"
                minLength={10}
                maxLength={10}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={!pass ? "password" : "text"}
                id="password"
                name="password"
                value={password}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Create password"
                minLength={8}
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={togglePass}>
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={!pass ? "password" : "text"}
                id="confirmPassword"
                name="confirmPassword"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                value={confirmPass}
                onChange={(e) => setconfirmPass(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm password"
                minLength={8}
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={togglePass}>
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
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
