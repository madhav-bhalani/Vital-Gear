import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../App.css";
import { useModal } from "../ModalContext";

function Header() {
  const {
    handleLoginClick,
    handleSignUpClick,
    userInfo,
    handleCartClick,
    isSignIn,
    removeSignIn,
  } = useModal();

  let firstName = "Madhav";
  let lastName = "Bhalani";

  return (
    <>
      <header className="flex flex-row bg-[#dbe2ef] min-h-[70px] justify-between py-5 px-20 items-center text-lg font-bold text-[#112D4E]">
        <div className=" min-w-[300px]">
          <ul className="flex flex-row p-3 gap-20">
            <NavLink to="/">
              <li className="hover:text-[#3F72AF]">Home</li>
            </NavLink>
            <div className="group inline-block">
              <li className="group-hover:text-[#3F72AF]">Shop</li>

              <div className="group-hover:block bg-[#dae0ef] w-max pl-7 pr-10 py-5 text-left absolute rounded-b-md z-10 hidden drop-shadow-sm">
                <ul className="font-semibold text-lg text-[#112D4E] flex flex-col gap-3 ">
                  <NavLink to="/Proteins" state={"Proteins"}>
                    <li className="hover:text-[#3F72AF]">Proteins</li>
                  </NavLink>
                  <NavLink to="/Gainers" state={"Gainers"}>
                    <li className="hover:text-[#3F72AF]">Gainers</li>
                  </NavLink>
                  <NavLink to="/PrePostWorkouts" state={"PrePostWorkouts"}>
                    <li className="hover:text-[#3F72AF]">Pre/Post Workouts</li>
                  </NavLink>
                  <NavLink to="/Vitamins" state={"Vitamins"}>
                    <li className="hover:text-[#3F72AF]">
                      Vitamin Supplements
                    </li>
                  </NavLink>
                  <NavLink to="/ActiveWear" state={"ActiveWear"}>
                    <li className="hover:text-[#3F72AF]">Active Wear</li>
                  </NavLink>
                </ul>
              </div>
            </div>
            <NavLink to="/Contact">
              <li className="hover:text-[#3F72AF]">Contact</li>
            </NavLink>
            <NavLink to="/admin">
              <li className="hover:text-[#3F72AF]">Dashboard</li>
            </NavLink>
          </ul>
        </div>

        <div className="block w-[200px] ">
          <ul>
            <li>
              <a href="">
                <img src="/logo-main.png" alt="" className="" />
              </a>
            </li>
          </ul>
        </div>

        <div className="min-w-[300px]">
          <ul className="flex flex-row p-3 justify-center gap-3 items-center">
            {isSignIn ? (
              <>
                <div className="flex flex-row gap-3 rounded-md bg-[#112D4E] text-[#DBE2EF] p-3">
                  <button onClick={removeSignIn}>Sign Out</button>
                  <div className="bg-[#DBE2EF] text-[#112D4E] p-2 rounded-full uppercase">
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </div>
                </div>
                <button
                  className="text-[#112D4E] text-2xl"
                  onClick={handleCartClick}
                >
                  <FaShoppingCart />
                </button>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="bg-[#dae0ef] p-3 hover:text-[#3F72AF] duration-500"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="bg-[#112D4E] text-[#dae0ef] p-3 rounded-md hover:text-[#112D4E] hover:bg-[#dae0ef] hover:border hover:border-[#112D4E] duration-500"
                    onClick={handleSignUpClick}
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    className="bg-[#dae0ef] p-3 rounded-md hover:text-[#3F72AF] duration-500 text-2xl"
                    onClick={handleCartClick}
                  >
                    <FaShoppingCart />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      <div className="dropdown-content bg-[#dae0ef] w-max pl-7 pr-10 py-5 text-left absolute top-[12.5%] left-[10%] rounded-b-md z-10 hidden">
        <ul className="font-semibold text-lg text-[#09274d] flex flex-col gap-3 ">
          <NavLink>
            <li>Proteins</li>
          </NavLink>
          <NavLink>
            <li>Gainers</li>
          </NavLink>
          <NavLink>
            <li>Pre/Post Workouts</li>
          </NavLink>
          <NavLink>
            <li>Vitamin Supplements</li>
          </NavLink>
          <NavLink>
            <li>Active Wear</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Header;
