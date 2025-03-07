import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import crudOperation from "../../utils/apiClient";
import { transition } from "../../config/transition";
import Button from "../../component/ReusableComponent/Buttons/Button";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import Swal from "sweetalert2";
import BackToHomeButton from "../../component/ReusableComponent/Buttons/BackToHomeButton";

const ReviewDetails = () => {
  const paramsId = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await crudOperation("GET", `/review/${paramsId}`);
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [paramsId]);
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

  if (loading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <span className="loading loading-dots loading-xl"></span>{" "}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center h-screen justify-center font-orbitron">
        <span className="text-xl md:text-2xl font-semibold text-gray-600">
          {" "}
          No review found.
        </span>{" "}
        <BackToHomeButton/>
      </div>
    );
  }

  const handleAddToWatchList = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to log in to add this review to your watchlist.",
      });
      return;
    }
    try {
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
      await crudOperation("POST", "/watchList", watchListData);
      Swal.fire({
        icon: "success",
        title: "Added to WatchList",
        text: "This review has been added to your WatchList.",
      });
    } catch (error) {
      console.error("Error adding to watchList:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add to watchlist. Please try again later.",
      });
    }
  };
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
              <div onClick={handleAddToWatchList} className="card-actions justify-end mt-4">
                <Button btnText="Add to WatchList" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
