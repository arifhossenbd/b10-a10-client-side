import { NavLink } from "react-router-dom";
import { links } from "../../config/links";
import { transition } from "../../config/transition";
import NavLinks from "../NavLinks/NavLinks";

const Footer = () => {
  return (
    <footer className="bg-neutral py-10 mt-5 md:mt-10">
      <div
        className={`footer sm:footer-horizontal px-4 md:px-0 md:w-11/12 mx-auto text-neutral-content font-orbitron ${transition}`}
      >
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link?.id}
                to={link?.path}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? `text-red-600 border-b-2 font-semibold border-red-600 ${transition}`
                      : `hover:text-red-600 relative after:absolute inline-block after:left-0 after:-bottom-0.5 after:border-b-2 after:border-red-600 after:w-0 hover:after:w-full after:bg-red-600 ${transition}`
                  } 
            ${transition} text-sm tracking-wide after:transition-all after:duration-300 w-fit`
                }
              >
                {link.text}
              </NavLink>
            ))}
          </ul>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
