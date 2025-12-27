















import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Appcontext } from "../context/AppContext";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { token, settoken, userData } = useContext(Appcontext);
  const navigate = useNavigate();

  /* ✅ SINGLE SOURCE OF LOGOUT (IMPORTANT) */
  const handleLogout = () => {
    settoken("");
    localStorage.removeItem("token");
    setProfileOpen(false);
    setShowMenu(false);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
    setProfileOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-300">
      {/* MAIN NAVBAR */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <img
          onClick={() => handleNavigate("/")}
          className="w-32 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center font-medium gap-6">
          {["/", "/doctors", "/about", "/contact"].map((path, i) => {
            const labels = ["Home", "All Doctors", "About", "Contact"];
            return (
              <NavLink key={path} to={path}>
                {({ isActive }) => (
                  <div className="text-center cursor-pointer">
                    <li className="py-1">{labels[i]}</li>
                    <hr
                      className={`h-0.5 bg-blue-500 w-3/5 m-auto ${
                        isActive ? "block" : "hidden"
                      }`}
                    />
                  </div>
                )}
              </NavLink>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop profile */}
          {token ? (
            <div className="relative hidden lg:flex items-center gap-2">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userData?.image || assets.profile_pic}
                  alt="Profile"
                />
                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 text-sm z-20">
                  <div className="min-w-[12rem] bg-stone-100 rounded-lg flex flex-col gap-2 p-4 shadow-lg">
                    <p
                      onClick={() => handleNavigate("/my-profile")}
                      className="cursor-pointer hover:text-black"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => handleNavigate("/my-appointment")}
                      className="cursor-pointer hover:text-black"
                    >
                      My Appointment
                    </p>
                    <p
                      onClick={handleLogout}
                      className="cursor-pointer text-red-500"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavigate("/login")}
              className="hidden lg:block bg-blue-500 text-white px-6 py-2 rounded-full"
            >
              Create Account
            </button>
          )}

          {/* Mobile menu icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 cursor-pointer lg:hidden"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </div>

      {/* MOBILE MENU */}
      {showMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMenu(false)}
          />

          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <img className="w-28" src={assets.logo} alt="Logo" />
              <img
                onClick={() => setShowMenu(false)}
                className="w-6 cursor-pointer"
                src={assets.cross_icon}
                alt="Close"
              />
            </div>

            <ul className="flex flex-col gap-4 font-medium">
              <NavLink to="/" onClick={() => handleNavigate("/")}>
                Home
              </NavLink>
              <NavLink to="/doctors" onClick={() => handleNavigate("/doctors")}>
                All Doctors
              </NavLink>
              <NavLink to="/about" onClick={() => handleNavigate("/about")}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => handleNavigate("/contact")}>
                Contact
              </NavLink>
            </ul>

            <div className="mt-6">
              {token ? (
                <div className="flex flex-col gap-3 text-sm">
                  <button onClick={() => handleNavigate("/my-profile")}>
                    My Profile
                  </button>
                  <button onClick={() => handleNavigate("/my-appointment")}>
                    My Appointment
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigate("/login")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4"
                >
                  Create Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
