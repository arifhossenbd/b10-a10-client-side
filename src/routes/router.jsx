import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../component/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddReview from "../pages/AddReview/AddReview";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllReview from "../pages/AllReview/AllReview";
import ReviewDetails from "../pages/ReviewDetails/ReviewDetails";
import MyReviews from "../pages/MyReviews/MyReviews";
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
                path: '/add-review',
                element: <AddReview/>
            },
            {
                path: '/all-review',
                element: <AllReview/>
            },
            {
                path: '/my-reviews',
                element: <MyReviews/>
            },
            {
                path: '/review-details/:id',
                element: <ReviewDetails/>,
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
