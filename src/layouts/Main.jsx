import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <HelmetProvider><Outlet/></HelmetProvider>
            <Footer/>
        </div>
    );
};

export default Main;