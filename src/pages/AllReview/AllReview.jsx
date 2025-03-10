import Reviews from "../Reviews/Reviews";
import { transition } from "../../config/transition";
import Loading from "../../component/Loading/Loading";
import NotFound from "../../component/NotFound/NotFound";
import GetAPI from "../../utils/GetAPI";
import Sidebar from "../../component/Sidebar/Sidebar";

const AllReview = () => {
  const { loading, data } = GetAPI("/reviews");
  // Display loading while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Display "Not available" message if reviews not available
  if (!data || data?.length === 0) {
    return (
      <NotFound message="All review is not available!" text="home" path="" />
    );
  }

  return (
    <div>
      <div
        className={`px-4 md:px-0 md:w-11/12 mx-auto mt-24 flex flex-col-reverse lg:flex-row gap-4 md:gap-5 ${transition}`}
      >
        <div>
          <h2 className="bg-red-600 py-2 px-4 text-white font-orbitron text-xl font-semibold md:font-bold relative">
            All Games
            <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-6 -translate-x-1/2"></span>
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-center mt-5 ${transition}`}
          >
            {data?.map((reviews) => (
              <Reviews key={reviews?._id} reviews={reviews} />
            ))}
          </div>
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default AllReview;
