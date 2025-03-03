import { FaFacebookF, FaGithub, FaLinkedin, FaPhone, FaPhoneAlt, FaRegUser, FaTwitter, FaUser, FaUserAlt, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { transition } from "../../config/transition";
import { useEffect, useState } from "react";
const Navbar = () => {
  // State to track if the user has scrolled down
  const [isScrolled, setIsScrolled] = useState(false);

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
  return (
    <div className={transition}>
      {/* Top Navbar */}
      <div
        className={`sticky flex flex-wrap items-center justify-between px-4 md:px-0 md:w-11/12 mx-auto py-4 border-b border-b-gray-100 gap-4 lg:gap-0 ${transition}`}
      >
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <p className="flex items-center gap-2 text-red-600"> <FaPhoneAlt/> <Link to={`tel:+12324567890`}><span className={`text-stone-600 hover:text-base-100 ${transition}`}>+(123)24567890</span></Link></p>
        <div className="flex items-center gap-2 md:gap-4">
          <FaRegUser/>
          <div className="flex items-center gap-2 md:gap-3">
          <Link to="/login" className={`text-stone-600 hover:text-base-100 ${transition}`}>Login</Link>
          <Link to="/register" className={`text-stone-600 hover:text-base-100 ${transition}`}>Registration</Link>
          </div>
          </div>
        </div>
        <div className={`flex items-center gap-2 md:gap-4 ${transition}`}>
          <Link to="https://github.com/arifhossenbd" target="_blank" className={`text-stone-600 hover:text-base-100 ${transition}`}>
            <FaGithub />
          </Link>
          <Link to="https://www.linkedin.com/in/arifprodev" target="_blank" className={`text-stone-600 hover:text-base-100 ${transition}`}>
            <FaLinkedin />
          </Link>
          <Link to="https://www.facebook.com/iarifhussain" target="_blank" className={`text-stone-600 hover:text-base-100 ${transition}`}>
            <FaFacebookF />
          </Link>
          <Link to="https://x.com/arifprodev" target="_blank" className={`text-stone-600 hover:text-base-100 ${transition}`}>
            <FaTwitter />
          </Link>
        </div>
      </div>
      {/* Navbar */}
      <div
          className={`fixed left-0 right-0 z-50 ease-in-out duration-300 ${
            isScrolled ? `bg-base-100 top-0 translate-y-0 transform-3d transition-all duration-700 delay-100 pb-2` : `bg-transparent mt-2 -translate-y-5 py-2 text-white`
          }`}>
        <div
          className={`navbar px-4 md:px-0 md:w-11/12 mx-auto flex items-center justify-between gap-2 mt-2 ${transition}`}
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
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-8 w-52 p-2 shadow"
              >
                <NavLinks />
              </ul>
            </div>
            <Link className="flex items-center gap-2" to="/">
              <img src="/logo1.png" className="md:h-12 md:w-12 h-10 w-10" alt="Logo" />
              <p className="text-2xl md:text-3xl font-semibold font-orbitron">
                Chill Gamer
              </p>
            </Link>
          </div>
          <ul className="hidden lg:flex">
            <NavLinks />
          </ul>
          <div className="dropdown dropdown-end w-fit">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle border border-stone-400 avatar hover:border-stone-300 hover:text-white"
            >
              <div className={`text-lg text-stone-500 ${transition}`}>
                <FaUser/>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-6 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Name
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Email</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
