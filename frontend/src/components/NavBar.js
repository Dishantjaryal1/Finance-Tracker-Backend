
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ text, onContactClick }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-9xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-orange-400 transition duration-300"
        >
          TrackIt
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => navigate("/")}
            className="text-lg hover:text-orange-400 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-lg hover:text-orange-400 transition duration-300"
          >
            Dashboard
          </button>
          <button
            onClick={onContactClick}
            className="text-lg hover:text-orange-400 transition duration-300"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-lg hover:text-orange-400 transition duration-300"
          >
            Blog
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("User");
              navigate("/login");
            }}
            className="text-lg hover:text-orange-400 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fas fa-bars text-2xl"></i>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4 shadow-lg">
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/");
            }}
            className="block w-full text-left px-6 py-2 text-lg hover:bg-gray-700 hover:text-orange-400 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/dashboard");
            }}
            className="block w-full text-left px-6 py-2 text-lg hover:bg-gray-700 hover:text-orange-400 transition duration-300"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onContactClick();
            }}
            className="block w-full text-left px-6 py-2 text-lg hover:bg-gray-700 hover:text-orange-400 transition duration-300"
          >
            Contact Us
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              localStorage.removeItem("User");
              navigate("/login");
            }}
            className="block w-full text-left px-6 py-2 text-lg hover:bg-gray-700 hover:text-orange-400 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
