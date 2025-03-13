import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import HighRatedGames from "../../pages/HighRatedGames/HighRatedGames";
import { transition } from "../../config/transition";
import Sidebar from "../Sidebar/Sidebar";
import GetAPI from "../../utils/GetAPI";
import Loading from "../Loading/Loading";
import Accordion from "../Accordion/Accordion";

const Home = () => {
  const { loading, data } = GetAPI("reviews");

  // Display loading while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Display "Not available" message if reviews not available
  if (!data || data?.length === 0) {
    return (
      <div
        className={`lg:absolute top-0 left-0 right-0 flex flex-col items-center h-screen justify-center text-center bg-[url(/assets/1.jpg)] bg-black z-1 ${transition} text-stone-100`}
      >
        <p className="lg:text-lg font-semibold">
          Reviews not found!
        </p>
      </div>
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
      <div className={`px-4 md:px-0 md:w-11/12 mx-auto xl:mt-96 xl:pt-48`}>
        <div
          className={`w-full flex flex-col-reverse lg:flex-row justify-between gap-4 md:gap-5 md:mt-5 ${transition}`}
        >
          <div className="lg:w-2/3 w-full">
            <HighRatedGames />
          </div>
          <div className="lg:w-1/3 w-full">
            <Sidebar />
          </div>
        </div>
        <div className="md:w-10/12 mx-auto md:mt-5">
          <Accordion />
        </div>
      </div>
    </div>
  );
};

export default Home;
