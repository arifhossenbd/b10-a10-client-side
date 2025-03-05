import { FaArrowLeft } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";
import { transition } from "../../config/transition";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col gap-2 md:gap-4 items-center text-center px-4 md:px-0 justify-center h-screen font-orbitron">
            <p className="text-xl md:text-2xl font-bold">{error.status}</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{error.statusText}</h1>
            <p className="font-semibold">Sorry, we couldn’t find the page you’re looking for.</p>
            <Link to="/" title="Return to the home page" className={`group flex items-center gap-1 btn bg-transparent border-red-600 text-red-600 hover:text-white hover:bg-red-600 mt-4 rounded-none ${transition}`}> <FaArrowLeft
                    className={`group-hover:-translate-x-1 translate-x-3 hover:{block} ${transition} group-hover:text-white text-transparent`}
                  />Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;