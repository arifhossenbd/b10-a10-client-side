import { useContext } from "react";
import MyReviewAndWatchListFunction from "../../component/ReusableComponent/MyReviewAndWatchListFunction/MyReviewAndWatchListFunction";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";

const MyWatchList = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <MyReviewAndWatchListFunction endpoint="myWatchList" endpointEmail={user?.email} message="Your review is not available in the Watch List!" text="all review" path="all-review"/>
    </div>
  );
};

export default MyWatchList;