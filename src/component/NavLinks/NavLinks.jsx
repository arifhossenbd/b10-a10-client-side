import { NavLink } from "react-router-dom";
import { links } from "../../config/links";
import { transition } from "../../config/transition";

const NavLinks = () => {
  return (
    <li className={`flex lg:items-center gap-2 lg:gap-4`}>
      {links.map((link) => (
        <NavLink
          key={link?.id}
          to={link?.path}
          className={({ isActive }) =>
            `${isActive ? "text-red-600 border-b-2 border-red-600 font-orbitron" 
            : `hover:text-red-600 relative after:absolute inline-block after:left-0 after:bottom-0 after:border-b-2 after:border-red-600 after:w-0 hover:after:w-full after:bg-red-600 ${transition}`} 
            ${transition} text-sm tracking-wide rounded-none font-semibold after:transition-all after:duration-300 w-fit p-0 m-0 font-orbitron`
        }
        >
          {link.text}
        </NavLink>
      ))}
    </li>
  );
};

export default NavLinks;