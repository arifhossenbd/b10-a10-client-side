import { useState } from "react";
import { transition } from "../../config/transition";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const activeTriangle = (
    <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-1/2 -translate-x-1/2"></span>
  );
  return (
    <div className="w-full">
      <div className={`${transition} flex`}>
        <button
          onClick={() => setActiveTab("recent")}
          className={`${
            activeTab === "recent"
              ? `bg-red-600 text-white`
              : `bg-black text-white`
          } py-2 px-4 font-orbitron text-xl font-semibold md:font-bold w-full relative`}
        >
          Recent {activeTab === "recent" ? activeTriangle : ""}
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`${
            activeTab === "popular"
              ? `bg-red-600 text-white`
              : `bg-black text-white`
          } py-2 px-4 font-orbitron text-xl font-semibold md:font-bold w-full relative`}
        >
          Popular
          {activeTab === "popular" ? activeTriangle : ""}
        </button>
      </div>
      <div className={`mt-5 ${transition}`}>
        <div>
          <img
            src={activeTab === "recent" ? "/assets/1.jpg" : "/assets/2.jpg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
