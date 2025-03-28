import React, { useState } from "react";
import "./SignUp.jsx";
import { useModal } from "../ModalContext.jsx";


export default function SignUp() {
  const { isSignUpVisible, handleSignUpModal } = useModal();


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
          action="http://localhost:3000/register"
          method="post"
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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter phone number"
                minLength={10}
                maxLength={10}
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {/* <svg
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
                </svg> */}
              </span>
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
                type="password"
                id="password"
                name="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Create password"
                minLength={8}
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

          {/* <div>
            <label
              htmlFor="password-confirm"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password-confirm"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm password"
                minLength={8}
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
          </div> */}

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
