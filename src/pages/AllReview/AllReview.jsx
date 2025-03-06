import { useEffect, useState } from "react";
import crudOperation from "../../utils/apiClient";
import Reviews from "../Reviews/Reviews";
import { transition } from "../../config/transition";

const AllReview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await crudOperation("GET", "/reviews");
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen">
      {loading ? (
        <div className="flex items-center h-screen justify-center">
          <span className="loading loading-dots loading-xl"></span>{" "}
        </div>
      ) : (
        <div className="px-4 md:px-0 md:w-11/12 mx-auto mt-24">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 items-center ${transition}`}>
            {data?.map((reviews) => (
              <Reviews key={reviews?._id} reviews={reviews} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReview;
