import { useContext } from "react";
import MyReviewAndWatchListFunction from "../../component/ReusableComponent/MyReviewAndWatchListFunction/MyReviewAndWatchListFunction";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";

const MyReviews = () => {
  const {user} = useContext(AuthContext);
  return (
    <MyReviewAndWatchListFunction endpoint="myReview" endpointEmail={user?.email} message="Your review is not available!" text="add review" path="add-review" headerText="My Reviews"/>
  );
};

export default MyReviews;