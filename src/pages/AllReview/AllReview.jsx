import Reviews from "../Reviews/Reviews";
import { transition } from "../../config/transition";
import Loading from "../../component/Loading/Loading";
import NotFound from "../../component/NotFound/NotFound";
import GetAPI from "../../utils/GetAPI";
import Sidebar from "../../component/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const AllReview = () => {
  const [page, setPage] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { loading, data, totalPages } = GetAPI("reviews", page, 5);
  const reviews = data?.data || [];
  const searchRef = useRef(null); // Ref for the search container

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchVisible(false); // Hide search bar if click outside
      }
    };
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter data based on search term (e.g., title)
  const filteredData = searchTerm
    ? reviews?.filter((review) =>
        review?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : reviews; // Show all data if no search term

  // Sort data based on the selected option
  const sortedData = filteredData?.slice().sort((a, b) => {
    if (sortOption === "Rating") {
      // Sort by Rating (Descending Order)
      return parseInt(b?.rating) - parseInt(a?.rating);
    } else if (sortOption === "Year") {
      // Sort by Year (Descending Order)
      return parseInt(b?.publishingYear) - parseInt(a?.publishingYear);
    } else {
      return 0; // No sorting
    }
  });
  // Display loading while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Display "Not available" message if reviews not available
  if (!data || data?.length === 0) {
    return <NotFound message="Reviews is not available!" text="home" path="" />;
  }

  //Function to generate page number dynamically (show 5 pages max)
  const getPageNumbers = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  return (
    <div
      className={`px-4 md:px-0 md:w-11/12 mx-auto mt-24 flex flex-col-reverse lg:flex-row justify-between gap-4 md:gap-5 ${transition}`}
    >
      <div className={`${transition} lg:w-2/3 w-full`}>
        <h2 className="bg-red-600 py-2 px-4 text-white font-orbitron text-xl font-semibold md:font-bold relative">
          <Typewriter
            words={[
              "All Reviews",
              "Latest Feedback",
              "User Opinions",
              "Customer Testimonials",
              "All Reviews",
            ]}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
          <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-6 -translate-x-1/2"></span>
        </h2>
        <div
          className={`my-5 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between items-end ${transition}`}
        >
          <select
            defaultValue="Sort by"
            className="w-48 focus:outline-stone-600 p-2 rounded outline outline-stone-300"
            onChange={(e) => setSortOption(e.target.value)} // Update sort option
          >
            <option disabled={true}>Sort by</option>
            <option>Rating</option>
            <option>Year</option>
          </select>
          <div className={`${transition} flex items-center`} ref={searchRef}>
            <input
              type="search"
              name="search"
              id="search"
              className={`border border-stone-300 p-2 rounded-full ${transition} ${
                isSearchVisible
                  ? "w-48 opacity-100 focus:outline-1"
                  : "w-0 opacity-0 cursor-default"
              }`}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {!isSearchVisible && (
              <button
                data-tip="Click for search"
                onClick={() => {
                  setIsSearchVisible(true);
                }}
                className="btn btn-ghost hover:bg-stone-200 btn-circle tooltip tooltip-left tooltip-info"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-center mt-5 ${transition}`}
        >
          {sortedData?.map((reviews) => (
            <Reviews key={reviews?._id} reviews={reviews} />
          ))}
        </div>

        {/* Pagination control */}
        <div
          className={`${transition} flex items-center flex-wrap gap-1 justify-center mt-6`}
        >
          {/* Previous Button */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`${transition} btn btn-outline rounded-none btn-sm mx-2`}
          >
            Previous
          </button>
          {/* Page Numbers */}
          <div className={`${transition} flex items-center gap-1 md:gap-2 flex-wrap`}>
            {getPageNumbers().map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`${transition} btn btn-sm ${
                  p === page
                    ? `bg-red-600 rounded-none text-white ${transition}`
                    : `${transition} rounded-none btn-outline border-red-600 hover:border-none`
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Next Button */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`${transition} btn btn-outline rounded-none btn-sm mx-2`}
          >
            Next
          </button>
        </div>
      </div>
      <div className="lg:w-1/3 w-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default AllReview;
