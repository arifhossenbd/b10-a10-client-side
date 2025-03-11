import { useEffect, useState } from "react";
import crudOperation from "../../utils/apiClient";
import { transition } from "../../config/transition";
import Button from "../../component/ReusableComponent/Buttons/Button";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaStar, FaUser } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const HighRatedGames = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await crudOperation("GET", "/highRatedGames");
        setData(response);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchData();
  }, []);

  const formateDate = (timeStamp) => {
    if (!timeStamp) return "Invalid Date";
    const date = new Date(Number(timeStamp));
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={``}>
      <h2 className="bg-red-600 py-2 px-4 text-white font-orbitron text-xl font-semibold md:font-bold relative">
        <Typewriter
          words={['High Rated Games', 'Top Rated Games', 'Highly Acclaimed Games', 'Best Reviewed Games', 'Top Picks for Gamers']}
          loop={true}
          cursor
          cursorStyle='|'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
        <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-6 -translate-x-1/2"></span>
      </h2>
      <div className={`${transition} mt-5`}>
        {data?.map((review) => (
          <div
            key={review?._id}
            className={`${transition} flex flex-col md:flex-row justify-between items-center gap-2 font-orbitron my-5 shadow`}
          >
            <figure className="lg:w-10/12 lg:h-56 mx-auto">
              <img
                src={review?.coverImg}
                className="w-full h-full object-center"
                alt={review?.title}
              />
            </figure>
            <div
              className={`${transition} flex flex-col gap-2 md:gap-3 w-full p-4`}
            >
              <h2
                className={`${transition} bg-green-500 p-1 md:p-2 px-2 md:px-4 text-white text-sm font-semibold w-fit`}
              >
                {review?.genres}
              </h2>
              <div className={`${transition} flex flex-wrap gap-2 md:gap-3`}>
                <p className={`${transition} flex item-center gap-1 text-sm text-stone-500`}>
                  <span className="text-red-600">
                    <FaCalendarAlt />
                  </span>{" "}
                  {formateDate(review?.timeStamp)}
                </p>
                <p className={`${transition} flex item-center gap-1 text-sm text-stone-500`}>
                  <span className="text-red-600 flex items-center gap-1">
                    <FaUser />
                  </span>{" "}
                  by {""}
                  {review?.reviewerName}
                </p>
                <p className={`${transition} flex item-center gap-1 text-sm text-stone-500`}>
                  <span className="text-red-600">
                    <FaStar />
                  </span>{" "}
                  {review?.rating}
                </p>
              </div>
              <h2 className="text-wrap text-xl md:text-2xl font-semibold md:font-bold">
                {review?.title}
              </h2>
              <Link to={`/review-details/${review?._id}`}>
                <Button btnText="View Details" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighRatedGames;
