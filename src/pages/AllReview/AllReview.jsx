import { useEffect, useState } from "react";
import crudOperation from "../../utils/apiClient";
import Reviews from "../Reviews/Reviews";
import { transition } from "../../config/transition";
import Loading from "../../component/Loading/Loading";
import NotFound from "../../component/NotFound/NotFound";

const AllReview = () => {

  // State to store the fetched reviews data
  const [data, setData] = useState([]);

  // State to manage loading state during data fetching
  const [loading, setLoading] = useState(false);

  // Effect to fetch reviews data when the component mounts
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true); // Set loading state to true before fetching dta
      try {
        const response = await crudOperation("GET", "/reviews"); // Fetch reviews data from the server
        setData(response);  // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching reviews", error); // Log error if fetching fails
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };
    fetchData(); // Call the fetch data function
  }, []); // Empty dependency array ensure this run only once on mount

  // Display loading while data is being fetched
  if(loading){
    return (
      <Loading/>
    );
  };

  // Display "Not available" message if reviews not available
  if (!data || data?.length === 0) {
    return (
      <NotFound message="All review is not available!" text="home" path=""/>
    );
  }
  
  return (
    <div className="h-screen">
      <div className="px-4 md:px-0 md:w-11/12 mx-auto mt-24">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 items-center ${transition}`}>
            {data?.map((reviews) => (
              <Reviews key={reviews?._id} reviews={reviews} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default AllReview;
