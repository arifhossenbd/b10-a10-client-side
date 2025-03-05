import { FaArrowRight } from "react-icons/fa";
import { transition } from "../../../config/transition";

const Button = ({btnText}) => {
  return (
    <button
      className={`font-orbitron group flex items-center gap-1 btn bg-transparent border-red-600 text-red-600 hover:text-white hover:bg-red-600 mt-4 rounded-none ${transition}`}
    >
      {btnText}
      <FaArrowRight
        className={`group-hover:translate-x-1 -translate-x-4 ${transition} group-hover:text-white text-transparent`}
      />
    </button>
  );
};

export default Button;
