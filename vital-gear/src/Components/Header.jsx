import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import "../App.css";
import { useModal } from "../ModalContext";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
function Header() {
  const navigate = useNavigate();
  const {
    handleLoginClick,
    handleSignUpClick,
    handleCart,
    cartVisible,
    isSignIn,
    fname,
    lname,
    userId,
    removeSignIn,
    isAdmin,
    setAdmin,
  } = useModal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log("HG Cart: ", cartVisible);

  let firstName = fname;
  let lastName = lname;

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Logout successful");
        setAdmin(false);
        alert(response.data.message); // Show success message
        removeSignIn(); // Update UI state after successful logout
      } else {
        console.error("Failed to logout");
        alert(response.data.error); // Show error message
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const viewProfile = () => {
    navigate("/User");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="bg-[#dbe2ef] min-h-[70px] text-lg font-bold text-[#112D4E] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="text-[#112D4E] hover:text-[#3F72AF] focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <NavLink to="/" className="hover:text-[#3F72AF]">
                Home
              </NavLink>

              <div className="group relative">
                <button className="group-hover:text-[#3F72AF]">Shop</button>
                <div className="group-hover:block bg-[#dae0ef] w-max pl-7 pr-10 py-5 text-left absolute top-full rounded-b-md z-10 hidden drop-shadow-sm">
                  <ul className="font-semibold text-lg text-[#112D4E] flex flex-col gap-3">
                    <NavLink
                      to="/Proteins"
                      state={"Proteins"}
                      className="hover:text-[#3F72AF]"
                    >
                      Proteins
                    </NavLink>
                    <NavLink
                      to="/Gainers"
                      state={"Gainers"}
                      className="hover:text-[#3F72AF]"
                    >
                      Gainers
                    </NavLink>
                    <NavLink
                      to="/PreWorkouts"
                      state={"PrePostWorkouts"}
                      className="hover:text-[#3F72AF]"
                    >
                      Pre Workouts
                    </NavLink>
                    <NavLink
                      to="/PostWorkouts"
                      state={"PrePostWorkouts"}
                      className="hover:text-[#3F72AF]"
                    >
                      Post Workouts
                    </NavLink>
                    <NavLink
                      to="/Vitamins"
                      state={"Vitamins"}
                      className="hover:text-[#3F72AF]"
                    >
                      Vitamin Supplements
                    </NavLink>
                    <NavLink
                      to="/ActiveWear"
                      state={"ActiveWear"}
                      className="hover:text-[#3F72AF]"
                    >
                      Active Wear
                    </NavLink>
                  </ul>
                </div>
              </div>

              <NavLink to="/Contact" className="hover:text-[#3F72AF]">
                Contact
              </NavLink>

              {isAdmin ? (
                <>
                  <NavLink to="/admin" className="hover:text-[#3F72AF]">
                    Dashboard
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </nav>

            {/* Logo - centered on mobile, in position on desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
              <NavLink to="/">
                <img
                  src="/logo-main.png"
                  alt="VitalGear Logo"
                  className="h-12 w-auto"
                />
              </NavLink>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center">
              <div className="hidden sm:flex items-center space-x-3">
                {isSignIn ? (
                  <>
                    <div className="flex items-center gap-3 rounded-full bg-[#112D4E] text-[#DBE2EF] p-2">
                      <button
                        onClick={handleLogout}
                        className="text-sm md:text-base"
                      >
                        Sign Out
                      </button>

                      <button
                        className="bg-[#DBE2EF] text-[#112D4E] p-2 rounded-full uppercase"
                        onClick={viewProfile}
                      >
                        {firstName.charAt(0)}
                        {lastName.charAt(0)}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-[#dae0ef] p-2 hover:text-[#3F72AF] duration-500 text-sm md:text-base"
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                    <button
                      className="bg-[#112D4E] text-[#dae0ef] p-2 rounded-md hover:text-[#112D4E] hover:bg-[#dae0ef] hover:border hover:border-[#112D4E] duration-500 text-sm md:text-base"
                      onClick={handleSignUpClick}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>

              {/* Shopping cart - visible on all screen sizes */}
              <button
                className="ml-3 p-2 text-[#112D4E] hover:text-[#3F72AF] duration-500 text-2xl"
                onClick={handleCart}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#dae0ef] shadow-lg absolute w-full z-30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className="block px-3 py-2 hover:text-[#3F72AF]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>

              <div className="relative">
                <button
                  className="w-full text-left px-3 py-2 hover:text-[#3F72AF] flex justify-between items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    const submenu = e.currentTarget.nextElementSibling;
                    submenu.classList.toggle("hidden");
                  }}
                >
                  Shop <span>▾</span>
                </button>
                <div className="pl-6 hidden">
                  <NavLink
                    to="/Proteins"
                    state={"Proteins"}
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Proteins
                  </NavLink>
                  <NavLink
                    to="/Gainers"
                    state={"Gainers"}
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gainers
                  </NavLink>
                  <NavLink
                    to="/PreWorkouts"
                    state={"PrePostWorkouts"}
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pre Workouts
                  </NavLink>
                  <NavLink
                    to="/PostWorkouts"
                    state={"PrePostWorkouts"}
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Post Workouts
                  </NavLink>
                  <NavLink
                    to="/Vitamins"
                    state={"Vitamins"}
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Vitamin Supplements
                  </NavLink>
                  <NavLink
                    to="/ActiveWear"
                    state={"ActiveWear"}
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Active Wear
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="/Contact"
                className="block px-3 py-2 hover:text-[#3F72AF]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>

              {isAdmin ? (
                <>
                  <NavLink
                    to="/admin"
                    className="block px-3 py-2 hover:text-[#3F72AF]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </>
              ) : (
                <></>
              )}

              {/* Mobile Auth Options */}
              <div className="sm:hidden pt-4 border-t border-gray-300">
                {isSignIn ? (
                  <>
                    <div className="flex items-center justify-between px-3 py-2">
                      <span>
                        Welcome, {firstName} {lastName}
                      </span>
                      <div
                        className="bg-[#112D4E] text-[#DBE2EF] p-2 rounded-full uppercase"
                        onClick={viewProfile}
                      >
                        {firstName.charAt(0)}
                        {lastName.charAt(0)}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 hover:text-[#3F72AF]"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="block w-full text-left px-3 py-2 hover:text-[#3F72AF]"
                      onClick={() => {
                        handleLoginClick();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 hover:text-[#3F72AF]"
                      onClick={() => {
                        handleSignUpClick();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* AI Chat Assistant Button - Fixed on all pages */}
      <button className="fixed bottom-6 right-6 bg-[#09274d] text-white p-3 rounded-full shadow-lg hover:bg-[#395c87] transition-all z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-square"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </>
  );
}

export default Header;
