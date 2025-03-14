import MyReviewAndWatchListFunction from "../../component/ReusableComponent/MyReviewAndWatchListFunction/MyReviewAndWatchListFunction";

const MyReviews = () => {
  return (
    <MyReviewAndWatchListFunction endpoint="myReview" message="Your review is not available!" text="add review" path="add-review" headerText="My Reviews"/>
  );
};

export default MyReviews;