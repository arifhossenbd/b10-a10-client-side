import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading/Loading";

const PrivateRoute = ({children}) => {
    const {loading, user} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading){
        return <Loading/>;
    };

    if(user){
        return children;
    };

    return <Navigate to="/login" state={{from: location}} replace/>;
};

export default PrivateRoute;