import { FaArrowRight } from "react-icons/fa";
import { transition } from "../../../config/transition";

const Button = ({ btnText, canWatchDetails, loading, submitLoading }) => {
  return (
    <button
    disabled={loading || submitLoading || canWatchDetails}
      className={`${loading || submitLoading || canWatchDetails ? `cursor-not-allowed mt-4 rounded-none btn bg-transparent` : `font-orbitron group flex items-center gap-1 btn bg-transparent border-red-600 text-red-600 hover:text-white hover:bg-red-600 mt-4 rounded-none ${transition}`}`}
    >
      {loading || submitLoading ? (
        <span className="loading loading-dots loading-xl"></span>
      ) : (
        <>
          <span className={`group-hover:-translate-x-1 translate-x-2 ${transition}`}>{btnText}</span>
          <FaArrowRight
            className={`group-hover:translate-x-1 -translate-x-3 ${transition} group-hover:opacity-100 opacity-0`}
          />
        </>
      )}
    </button>
  );
};

export default Button;
