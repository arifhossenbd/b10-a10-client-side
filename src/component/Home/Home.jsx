import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Chill Gamer</title>
      </Helmet>
      <Banner />
      <div className={`px-4 md:px-0 md:w-11/12 mx-auto h-screen`}></div>
    </div>
  );
};

export default Home;
