import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import crudOperation from "../../utils/apiClient";
import { transition } from "../../config/transition";
import Button from "../../component/ReusableComponent/Buttons/Button";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import Swal from "sweetalert2";
import BackToHomeButton from "../../component/ReusableComponent/Buttons/BackToHomeButton";

const ReviewDetails = () => {
  const paramsId = useParams(); // Get the review ID from the URL parameter
  const [data, setData] = useState([]); // State to hold review data
  const [loading, setLoading] = useState(false); // State to track loading state
  const { user } = useContext(AuthContext); // Access user authentication data

  // Fetch review details when the component mounts or the review ID changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true during data fetching
      try {
        // Fetch review details using the review ID from the URL
        const response = await crudOperation("GET", `/review/${paramsId}`);
        setData(response?.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching reviews", error); // Log error if fetching fails
      } finally {
        setLoading(false); // Reset loading state after fetching
      }
    };
    fetchData(); // Call the fetchData function
  }, [paramsId]);

  // Destructure review data for easier access
  const {
    _id,
    coverImg,
    title,
    genres,
    rating,
    publishingYear,
    reviewDescription,
    userName,
    userEmail,
  } = data;

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <span className="loading loading-dots loading-xl"></span>{" "}
      </div>
    );
  }

  // Show message if review is not available
  if (!data) {
    return (
      <div className="flex items-center h-screen justify-center font-orbitron">
        <span className="text-xl md:text-2xl font-semibold text-gray-600">
          {" "}
          Review is not available.
        </span>{" "}
        <BackToHomeButton />
      </div>
    );
  }

  // Function to add review to WatchList
  const handleAddToWatchList = async () => {
    try {
      // Prepare data to be added to the WatchList
      const watchListData = {
        reviewId: data?._id,
        coverImg: data?.coverImg,
        title: data?.title,
        genres: data?.genres,
        rating: data?.rating,
        publishingYear: data?.publishingYear,
        reviewDescription: data?.reviewDescription,
        userName: user?.displayName,
        userEmail: user?.email,
      };
      // Send a POST request to add the review to the WatchList
      await crudOperation("POST", "/watchList", watchListData);
      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Added to WatchList",
        text: "This review has been added to your WatchList.",
      });
    } catch (error) {
      console.error("Error adding to watchList:", error); // Log error if the operation fails

      // Show error notification
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add to watchlist. Please try again later.",
      });
    }
  };

  // condition to check if the logged in user is the owner of the review
  const canWatchDetails =
    user?.displayName === userName || user?.email === userEmail;
  return (
    <div className="h-screen">
      <div className="px-4 md:px-0 md:w-11/12 mx-auto mt-24">
        <div
          className={`card bg-base-100 shadow-xl rounded-none ${transition} hover:shadow-2xl font-orbitron`}
        >
          <figure className="relative h-48 overflow-hidden">
            <img
              src={coverImg}
              alt={title}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className={`card-body p-4 ${transition}`}>
            <h2 className="card-title text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{genres}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 font-semibold">
                Rating: {rating}
              </span>
              <span className="text-gray-400 ml-4">Year: {publishingYear}</span>
            </div>
            <p className="text-sm font-inter">{reviewDescription}</p>
            <div className="text-gray-600 mt-4 space-y-0.5 md:space-y-1">
              <p>
                Reviewed by: <span className="font-semibold">{userName}</span>
              </p>
              <p>
                Email: <span className="font-semibold">{userEmail}</span>
              </p>
            </div>
            {user && (
              <div
                data-tip="You can't add to WatchList"
                onClick={!canWatchDetails && handleAddToWatchList}
                className={`card-actions justify-end mt-4 ${
                  canWatchDetails && `tooltip tooltip-info cursor-not-allowed`
                }`}
              >
                <Button
                  btnText="Add to WatchList"
                  canWatchDetails={canWatchDetails}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
