import { useRouteError } from "react-router-dom";
import BackToButton from "../../component/ReusableComponent/Buttons/BackToButton";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col gap-2 md:gap-4 items-center justify-center h-screen bg-[url(/assets/1.jpg)]">
            <p className="text-xl md:text-2xl font-bold">{error.status}</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{error.statusText}</h1>
            <p className="font-semibold">Sorry, we couldn’t find the page you’re looking for.</p>
            <BackToButton text="home" path=""/>
        </div>
    );
};

export default ErrorPage;