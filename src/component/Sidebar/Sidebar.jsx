import { useState } from "react";
import { transition } from "../../config/transition";
import GetAPI from "../../utils/GetAPI";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const { data: recent, loading: recentLoading } = GetAPI("latestReviews");
  const { data: popular, loading: popularLoading } = GetAPI("popularReviews");

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

  const loadingDots = (
    <div className="flex items-center justify-center mt-12">
      <span className="loading loading-dots w-10 h-10 sm:w-16 sm:h-16"></span>
    </div>
  );

  return (
    <div className={`${transition} w-full`}>
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
            words={["Popular"]}
            loop={2}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />

          {activeTab === "popular" ? activeTriangle : ""}
        </button>
      </div>
      <div className={`mt-5 ${transition}`}>
        {activeTab === "recent" ? (
          <div>
            {recentLoading ? loadingDots : (
              <div>
                {!recent || recent?.length === 0 ? (
                  <div className="flex items-center justify-center mt-12">
                    <p>Recent reviews not found</p>
                  </div>
                ) : (
                  recent?.map((recentData) => (
                    <div key={recentData?._id}>
                      <Link
                        to={`/review-details/${recentData?._id}`}
                        className={`${transition} flex items-center gap-4 font-orbitron`}
                      >
                        <figure className="md:h-48 md:w-96 h-32 w-60">
                          <img
                            src={recentData?.coverImg}
                            className={`w-full h-full object-center hover:scale-110 ${transition}`}
                            alt={recentData?.title}
                          />
                        </figure>
                        <div
                          className={`${transition} flex flex-col gap-1 w-2/3`}
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
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {popularLoading ? loadingDots : (
              <div>
                {!popular || popular?.length === 0 ? (
                  <div className="flex items-center justify-center mt-8">
                    <p>Popular reviews not found</p>
                  </div>
                ) : (
                  popular?.map((popularData) => (
                    <div key={popularData?._id}>
                      <Link
                        to={`/review-details/${popularData?._id}`}
                        className={`${transition} flex items-center gap-4 font-orbitron`}
                      >
                        <figure className="md:h-48 md:w-96 h-32 w-60">
                          <img
                            src={popularData?.coverImg}
                            className={`w-full h-full object-center hover:scale-110 ${transition}`}
                            alt={popularData?.title}
                          />
                        </figure>
                        <div
                          className={`${transition} flex flex-col gap-1 w-2/3`}
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
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
