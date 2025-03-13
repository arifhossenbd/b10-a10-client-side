import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaRegUser,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { transition } from "../../config/transition";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import AuthAlert from "../ReusableComponent/AuthAlert/AuthAlert";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser, loading } = useContext(AuthContext);
  const location = useLocation();
  const presentPath = location?.pathname;
  // State to track if the user has scrolled down
  const [isScrolled, setIsScrolled] = useState(false);
  // State to theme control
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("dark"))
  );

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // User has scrolled down
      } else {
        setIsScrolled(false); // User is at top
      }
    };
    window.addEventListener("scroll", handleScroll); // Add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
        });
      })
      .catch((error) => {
        AuthAlert({ error: error || {} });
      });
  };

  return (
    <div className={`${transition} lg:relative z-50`}>
      {/* Top Navbar */}
      <div
        className={`flex flex-wrap items-center justify-between px-4 md:px-0 md:w-11/12 mx-auto py-4 border-b ${
          presentPath === `/` ? `border-b-gray-100` : `border-b-gray-200`
        } gap-4 lg:gap-0 ${transition}`}
      >
        <div className="flex flex-wrap items-center gap-2 md:gap-4 font-orbitron text-xs">
          <p className="flex items-center gap-2">
            <FaPhoneAlt className=" text-red-600" />
            <Link className="tracking-widest" to={`tel:+12324567890`}>
              <span
                className={`${
                  presentPath === "/"
                    ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                    : `hover:text-stone-400 dark:text-white ${transition}`
                } ${transition}`}
              >
                +(123)24567890
              </span>
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <FaRegUser className="text-red-600" />
            <div className="flex items-center gap-2 tracking-widest">
              <Link
                to="/login"
                className={`${
                  presentPath === "/"
                    ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                    : `hover:text-stone-400 dark:text-white ${transition}`
                } ${transition}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${
                  presentPath === "/"
                    ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                    : `hover:text-stone-400 dark:text-white ${transition}`
                } ${transition}`}
              >
                Registration
              </Link>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-2 md:gap-4 ${transition}`}>
          <Link
            to="https://github.com/arifhossenbd"
            target="_blank"
            className={`${
              presentPath === "/"
                ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                : `hover:text-stone-400 dark:text-white ${transition}`
            } ${transition}`}
          >
            <FaGithub />
          </Link>
          <Link
            to="https://www.linkedin.com/in/arifprodev"
            target="_blank"
            className={`${
              presentPath === "/"
                ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                : `hover:text-stone-400 dark:text-white ${transition}`
            } ${transition}`}
          >
            <FaLinkedinIn />
          </Link>
          <Link
            to="https://www.facebook.com/iarifhussain"
            target="_blank"
            className={`${
              presentPath === "/"
                ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                : `hover:text-stone-400 dark:text-white ${transition}`
            } ${transition}`}
          >
            <FaFacebookF />
          </Link>
          <Link
            to="https://x.com/arifprodev"
            target="_blank"
            className={`${
              presentPath === "/"
                ? `hover:text-gray-600 dark:text-white lg:text-gray-300 lg:hover:text-white`
                : `hover:text-stone-400 dark:text-white ${transition}`
            } ${transition}`}
          >
            <FaTwitter />
          </Link>
        </div>
      </div>
      {/* Main Navbar */}
      <div
        className={`fixed left-0 right-0 z-50 ease-in-out duration-300 ${
          isScrolled
            ? `bg-base-100 top-0 translate-y-0 transform-3d transition-all duration-700 delay-100 pb-2`
            : `mt-2 -translate-y-5 py-2 ${
                presentPath === "/" ? `dark:text-white` : ``
              }`
        }`}
      >
        <div
          className={`navbar px-4 md:px-0 md:w-11/12 mx-auto flex items-center justify-between gap-2 mt-2 font-orbitron font-semibold ${transition}`}
        >
          <div className={`flex items-center gap-2 lg:gap-0 ${transition}`}>
            <div className={`dropdown ${transition}`}>
              <div tabIndex={0} role="button" className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content bg-base-100 flex justify-start rounded-box z-1 ${
                  isScrolled ? `mt-8` : `mt-3`
                } min-w-40 p-2 shadow hover:text-gray-600 text-gray-700`}
              >
                <NavLinks />
              </ul>
            </div>
            <Link className="flex items-center gap-2" to="/">
              <img
                src="/logo.png"
                className="md:h-12 md:w-12 h-10 w-10"
                alt="Logo"
              />
              <p className="text-2xl md:text-3xl font-semibold font-orbitron">
                Chill Gamer
              </p>
            </Link>
          </div>
          <ul className="hidden lg:flex">
            <NavLinks />
          </ul>
          <div>
            {loading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              <div className="dropdown dropdown-end w-fit">
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-ghost btn-circle border border-stone-400 avatar hover:border-stone-300 hover:text-white ${transition}`}
                >
                  {user ? (
                    <img
                      src={user?.photoURL}
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    />
                  ) : (
                    <div className={`text-lg text-stone-500 ${transition}`}>
                      <FaUser />
                    </div>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className={`menu menu-sm dropdown-content bg-base-200 light:hover:text-gray-600 light:text-gray-700 rounded-box z-1 ${
                    isScrolled ? `mt-6` : `mt-1`
                  } w-52 p-2 shadow tracking-wide`}
                >
                  {user ? (
                    <div>
                      <li>
                        <a className="justify-between">
                          {user?.displayName || user?.email}
                        </a>
                      </li>
                      <li onClick={handleLogout}>
                        <a>Logout</a>
                      </li>
                    </div>
                  ) : (
                    <div className="flex">
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/register">Registration</Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            )}
            <label className="swap swap-rotate pl-5">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
                onChange={() => setIsDark(!isDark)}
              />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
