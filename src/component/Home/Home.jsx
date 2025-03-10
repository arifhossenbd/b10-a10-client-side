import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import HighRatedGames from "../../pages/HighRatedGames/HighRatedGames";
import { transition } from "../../config/transition";
import Sidebar from "../Sidebar/Sidebar";
import GetAPI from "../../utils/GetAPI";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";

const Home = () => {
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
    <div className={`${transition} space-y-6`}>
      <Helmet>
        <title>Home - Chill Gamer</title>
      </Helmet>
      <div>
        <Banner />
      </div>
      <div className={`px-4 md:px-0 md:w-11/12 mx-auto lg:mt-96 lg:pt-48`}>
        <div
          className={`lg:grid grid-cols-3 flex flex-col-reverse justify-between gap-4 md:gap-5 ${transition}`}
        >
          <div className="col-span-2">
            <HighRatedGames />
          </div>
          <div className="col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
