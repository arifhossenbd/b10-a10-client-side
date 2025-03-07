import { Link } from "react-router-dom";
import { transition } from "../../../config/transition";
import { FaArrowLeft } from "react-icons/fa";

const BackToHomeButton = () => {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-1 btn bg-transparent border-red-600 text-red-600 hover:text-white hover:bg-red-600 mt-4 rounded-none tooltip tooltip-left tooltip-info ${transition}`}
    data-tip="Return to the home page">
      {" "}
      <FaArrowLeft
        className={`group-hover:-translate-x-1 translate-x-3 opacity-0 group-hover:opacity-100 ${transition} text-white`}
      />
      <span className={`-translate-x-2 group-hover:translate-x-0 ${transition}`}>Go Back Home</span>
    </Link>
  );
};

export default BackToHomeButton;
