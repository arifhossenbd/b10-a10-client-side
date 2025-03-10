import { useState } from "react";
import { transition } from "../../config/transition";
import GetAPI from "../../utils/GetAPI";
import { FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const activeTriangle = (
    <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-1/2 -translate-x-1/2"></span>
  );
  const { data: recent } = GetAPI("/latestReviews");
  // const {data:popular} = GetAPI("/popularGames");
  // console.log(popular)

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
    <div className="w-full">
      <div className={`${transition} flex`}>
        <button
          onClick={() => setActiveTab("recent")}
          className={`cursor-pointer ${
            activeTab === "recent"
              ? `${transition} bg-red-600 text-white`
              : `bg-black text-white`
          } py-2 px-4 font-orbitron text-xl font-semibold md:font-bold w-full relative hover:bg-red-600 ${transition}`}
        >
          Recent {activeTab === "recent" ? activeTriangle : ""}
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`cursor-pointer ${
            activeTab === "popular"
              ? `${transition} bg-red-600 text-white`
              : `bg-black text-white`
          } py-2 px-4 font-orbitron text-xl font-semibold md:font-bold w-full relative hover:bg-red-600 ${transition}`}
        >
          Popular
          {activeTab === "popular" ? activeTriangle : ""}
        </button>
      </div>
      <div className={`mt-5 ${transition}`}>
        {activeTab === "recent" ? (
          <div className="space-y-3 md:space-y-5">
            {recent?.map((recentData) => (
              <div>
                <div
                  key={recentData?._id}
                  className={`${transition} flex flex-row justify-between items-center font-orbitron`}
                >
                  <figure className="h-full w-60  mx-auto">
                    <img
                      src={recentData?.coverImg}
                      className={`w-full h-full object-center hover:scale-110 cursor-pointer ${transition}`}
                      alt={recentData?.title}
                    />
                  </figure>
                  <div
                    className={`${transition} flex flex-col gap-2 md:gap-3 w-full p-4`}
                  >
                    <p className={`${transition} flex item-center gap-1`}>
                      <span className="text-red-600">
                        <FaCalendarAlt />
                      </span>{" "}
                      {formateDate(recentData?.timeStamp)}
                    </p>
                    <h2 className="text-wrap font-semibold">
                      {recentData?.title}
                    </h2>
                  </div>
                </div>
                <hr className="h-1 w-full mt-3 md:mt-5 text-stone-200" />
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
