import { FaArrowLeft, FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";
import { transition } from "../../config/transition";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col gap-2 md:gap-4 items-center justify-center h-screen">
            <p className="text-xl md:text-2xl font-bold">{error.status}</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{error.statusText}</h1>
            <p className="font-semibold">Sorry, we couldn’t find the page you’re looking for.</p>
            <Link to="/" title="Return to the home page" className={`group flex items-center gap-1 hover:text-red-600 font-semibold ${transition}`}> <FaArrowLeft className={`group-hover:-translate-x-1 ${transition}`}/> <span className="underline">Go Back Home</span></Link>
        </div>
    );
};

export default ErrorPage;