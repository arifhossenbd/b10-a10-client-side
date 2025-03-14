import MyReviewAndWatchListFunction from "../../component/ReusableComponent/MyReviewAndWatchListFunction/MyReviewAndWatchListFunction";

const MyWatchList = () => {
  return (
    <div>
      <MyReviewAndWatchListFunction endpoint="myWatchList" message="Your review is not available in the Watch List!" text="all review" path="all-review"/>
    </div>
  );
};

export default MyWatchList;