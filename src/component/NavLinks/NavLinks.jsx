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
          className={({ isActive }) => isActive ? `text-red-600 underline ${transition}` : `hover:text-red-600 hover:underline ${transition}`}
        >
          {link.text}
        </NavLink>
      ))}
    </li>
  );
};

export default NavLinks;