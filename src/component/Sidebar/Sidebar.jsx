import { useState } from "react";
import { transition } from "../../config/transition";
import GetAPI from "../../utils/GetAPI";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Typewriter } from "react-simple-typewriter";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const { data: recent, loading } = GetAPI("/latestReviews");
  const { data: popular } = GetAPI("/popularReviews");

  if (loading) {
    return <Loading />;
  }

  const formateDate = (timeStamp) => {
    if (!timeStamp) return "Invalid Date";
    const date = new Date(Number(timeStamp));
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const activeTriangle = (
    <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-1/2 -translate-x-1/2"></span>
  );

  return (
    <div className={`${transition}`}>
      <div className={`${transition} flex w-full`}>
        <button
          onClick={() => setActiveTab("recent")}
          className={`cursor-pointer ${
            activeTab === "recent"
              ? `${transition} bg-red-600 text-white`
              : `bg-black text-white`
          } py-2 px-4 font-orbitron text-xl font-semibold md:font-bold w-full relative hover:bg-red-600 ${transition}`}
        >
          <Typewriter
            words={["Recent"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
           {activeTab === "recent" ? activeTriangle : ""}
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`cursor-pointer ${
            activeTab === "popular"
              ? `${transition} bg-red-600 text-white`
              : `bg-black text-white`
          } py-2 px-4 font-orbitron text-xl font-semibold md:font-bold w-full relative hover:bg-red-600 ${transition}`}
        >
          <Typewriter
            words={['Popular']}
            loop={2}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
          
          {activeTab === "popular" ? activeTriangle : ""}
        </button>
      </div>
      <div className={`mt-5 ${transition}`}>
        {activeTab === "recent" ? (
          <div className="space-y-3 md:space-y-5">
            {recent?.map((recentData) => (
              <div key={recentData?._id}>
                <Link
                  to={`/review-details/${recentData?._id}`}
                  className={`${transition} flex flex-row justify-between font-orbitron`}
                >
                  <figure className="w-[420px] md:w-80">
                    <img
                      src={recentData?.coverImg}
                      className={`w-full h-fit object-center hover:scale-110 ${transition}`}
                      alt={recentData?.title}
                    />
                  </figure>
                  <div
                    className={`${transition} flex flex-col gap-1 w-full pl-4`}
                  >
                    <p
                      className={`${transition} flex item-center gap-1 text-stone-500 text-sm`}
                    >
                      <span className="text-red-600">
                        <FaCalendarAlt />
                      </span>
                      {formateDate(recentData?.timeStamp)}
                    </p>
                    <h2 className="text-wrap font-semibold">
                      {recentData?.title}
                    </h2>
                  </div>
                </Link>
                <div className="divider"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 md:space-y-5">
            {popular?.map((popularData) => (
              <div key={popularData?._id}>
                <Link
                  to={`/review-details/${popularData?._id}`}
                  className={`${transition} flex flex-row justify-between font-orbitron`}
                >
                  <figure className="w-[420px] md:w-80">
                    <img
                      src={popularData?.coverImg}
                      className={`w-full h-fit object-center hover:scale-110 ${transition}`}
                      alt={popularData?.title}
                    />
                  </figure>
                  <div
                    className={`${transition} flex flex-col gap-1 w-full pl-4`}
                  >
                    <p
                      className={`${transition} flex item-center gap-1 text-stone-500 text-sm`}
                    >
                      <span className="text-red-600">
                        <FaCalendarAlt />
                      </span>
                      {formateDate(popularData?.timeStamp)}
                    </p>
                    <h2 className="text-wrap font-semibold">
                      {popularData?.title}
                    </h2>
                    <p
                      className={`${transition} flex item-center gap-1 text-stone-500 text-sm`}
                    >
                      <span className="text-red-600 text-lg md:text-xl">
                        <FaEye />
                      </span>
                      {Number(popularData?.clickCount)}
                    </p>
                  </div>
                </Link>
                <div className="divider"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
