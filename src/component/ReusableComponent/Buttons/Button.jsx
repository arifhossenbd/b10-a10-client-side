import { FaArrowRight } from "react-icons/fa";
import { transition } from "../../../config/transition";

const Button = ({ btnText, canAddToWatchList, loading, submitLoading }) => {
  return (
    <button
    disabled={loading || submitLoading || canAddToWatchList}
      className={`${loading || submitLoading || canAddToWatchList ? `cursor-not-allowed mt-1 md:mt-4 p-2 font-semibold shadow flex items-center justify-center bg-stone-200 text-stone-400` : `font-orbitron group flex justify-center items-center gap-1 border-2 py-1 md:p-2 px-2 md:px-4 text-sm border-red-600 text-red-600 hover:text-white hover:bg-red-600 mt-1 md:mt-4 font-semibold cursor-pointer ${transition}`}`}
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
