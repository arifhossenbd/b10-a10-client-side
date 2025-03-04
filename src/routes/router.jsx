import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../component/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddReview from "../pages/AddReview/AddReview";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/add-reviews',
                element: <AddReview/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
]);

export default router;
