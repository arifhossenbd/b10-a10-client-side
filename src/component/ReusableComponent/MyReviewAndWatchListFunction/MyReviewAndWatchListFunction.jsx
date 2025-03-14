import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider/AuthContext";
import crudOperation from "../../../utils/apiClient";
import Swal from "sweetalert2";
import { transition } from "../../../config/transition";
import CrudRelatedForm from "../CrudRelatedForm/CrudRelatedForm";
import { FaXmark } from "react-icons/fa6";
import { FaArrowDown, FaEdit, FaInfo, FaTrash } from "react-icons/fa";
import Loading from "../../Loading/Loading";
import NotFound from "../../NotFound/NotFound";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import { Typewriter } from "react-simple-typewriter";
import GetAPI from "../../../utils/GetAPI";

const MyReviewAndWatchListFunction = ({
  endpoint,
  message,
  text,
  path,
  headerText,
}) => {
  // State for Update Loading
  const [updateLoading, setUpdateLoading] = useState(false);
  //State to store the selected review for update
  const [selectedReview, setSelectedReview] = useState();
  const [page, setPage] = useState(1);
  //Getting the logged in user from AuthContext
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { data, setData, loading, totalPages } = GetAPI(
    endpoint,
    email,
    page,
    6
  );
  const reviews = data?.data;

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Show message if there are no reviews available
  if (!reviews || reviews?.length === 0) {
    return <NotFound message={message} text={text} path={path} />;
  }

  // Function to handle deleting a review
  const handleDeleteReview = async (id) => {
    // Confirm deletion with SweetAlert2
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If the user confirms deletion
    if (confirmDelete.isConfirmed) {
      try {
        // Send a DELETE request to delete the review
        await crudOperation("DELETE", `${endpoint}/${id}`);
        // Update the state to remove the deleted review immediate
        setData(reviews?.filter((review) => review?._id !== id));
        Swal.fire("Deleted", "Your review has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting review:", error);

        Swal.fire("Error", "Failed to delete the review", "error");
      }
    }
  };

  // Function to set the selected review for update
  const updateReview = (reviewId) => {
    setSelectedReview(reviews?.find((review) => review?._id === reviewId));
    document.getElementById("modal").showModal();
  };

  // Function to handle review update
  const handleUpdateReview = async (updatedReview) => {
    setUpdateLoading(true); // Show loading while update the review
    try {
      const { _id, ...updateData } = updatedReview; // Extract the review ID and other data
      // Send a PUT request to update the review
      const response = await crudOperation(
        "PUT",
        `${endpoint}/${updatedReview?._id}`,
        updateData
      );
      if (response?.success) {
        // Updating the state to reflect change instantly
        const updatedReviewData = { ...updatedReview, ...updateData };
        setData((prevData) =>
          prevData?.map((review) =>
            review?._id === _id ? updatedReviewData : review
          )
        );

        Swal.fire("Updated", "Your review has been updated.", "success");
        document.getElementById("modal").close();
      } else {
        Swal.fire("Error", "Failed to update the review", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateLoading(false); // Reset loading state after update
    }
  };

  // Function to handle input changes in the update form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleDetailsClick = async (id) => {
    try {
      // Send a PUT request to increment the click count
      await crudOperation("PUT", `incrementClickCount/${id}`);
    } catch (error) {
      console.error("Error incrementing click count:", error);
    }
  };

  //Function to generate page number dynamically (show 5 pages max)
  const getPageNumbers = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div>
      <div className="px-4 md:px-0 md:w-11/12 mx-auto mt-24 flex flex-col-reverse lg:flex-row gap-4 md:gap-5 w-full">
        <div className="lg:w-2/3 w-full">
          <h2 className="bg-red-600 py-2 px-4 mb-5 text-white font-orbitron text-xl font-semibold md:font-bold relative">
            {endpoint === "myReview" ? headerText : "My Watch List"}
            <span className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-red-600 absolute -bottom-2 left-6 -translate-x-1/2"></span>
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Media Details</th>
                  <th>Review Title</th>
                  <th>Review Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews?.map((review, idx) => (
                  <tr key={review?._id} className="text-gray-500">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex gap-2 items-center">
                        <div className="avatar">
                          <div className="mask h-20 w-28 md:h-24 md:w-32">
                            <img src={review?.coverImg} alt="Cover Image" />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{review?.genres}</p>
                          <p className="font-semibold">
                            Year:
                            <span className="font-normal">
                              {review?.publishingYear}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Rating:
                            <span className="font-normal">
                              {review?.rating}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h2 className="font-semibold">{review?.title}</h2>
                    </td>
                    <td>{review?.reviewDescription}</td>
                    <th>
                      <Link
                        onClick={() => handleDetailsClick(review?.watchId)}
                        to={`/review-details/${review?.watchId || review?._id}`}
                      >
                        <button
                          className="btn btn-ghost hover:text-cyan-500 tooltip tooltip-info"
                          data-tip="Details"
                        >
                          <FaInfo className=" font-semibold text-base md:text-lg" />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteReview(review?._id)}
                        className="btn btn-ghost tooltip tooltip-error hover:text-red-600"
                        data-tip="Delete"
                      >
                        <FaTrash className="font-semibold text-base md:text-lg" />
                      </button>
                      {user?.email === review?.reviewerEmail ? (
                        <button
                          onClick={() => updateReview(review?._id)}
                          className="btn btn-ghost hover:text-cyan-500 tooltip tooltip-info"
                          data-tip="Update"
                        >
                          <FaEdit className=" font-semibold text-base md:text-lg" />
                        </button>
                      ) : (
                        ""
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <div
              className={`${transition} flex items-center gap-1 md:gap-2 flex-wrap`}
            >
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

      {/* Modal for updating review */}
      <dialog
        id="modal"
        className={`modal flex items-center justify-center modal-middle space-y-2 fixed px-4 md:px-0`}
        onClick={(e) => e.target.tagName === "DIALOG" && e.target.close()}
      >
        <div
          className={`modal-box rounded-none w-full max-w-2xl ${transition}`}
        >
          <button
            onClick={() => document.getElementById("modal").close()}
            className={`btn rounded-none hover:text-red-600 absolute w-fit top-0 left-0 tooltip tooltip-info tooltip-right ${transition}`}
            data-tip="Click here or outside for close."
          >
            <FaXmark className={`font-semibold md:text-lg`} />
          </button>
          <div className="mt-3 md:mt-5 w-full">
            {/* Reusable CrudRelatedForm component for updating the review */}
            <CrudRelatedForm
              btnText={
                updateLoading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Update Review"
                )
              }
              review={selectedReview} // Pass the selected review data
              handleSubmit={handleUpdateReview} // Pass the update handler
              handleChange={handleChange} // Pass the input change handler
              updateLoading={updateLoading} // Pass the update loading state
            >
              <div className="space-y-1 pt-2 px-4 text-wrap">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-orbitron text-stone-600">
                  Update Review
                </h2>
                <p className="text-stone-500 text-wrap flex items-center justify-center gap-1 text-xs md:text-sm">
                  <Typewriter
                    words={[
                      `Welcome ${
                        user?.displayName || "Dear User"
                      }, You can update your review`,
                    ]}
                    loop={5}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                  <FaArrowDown />{" "}
                </p>
              </div>
            </CrudRelatedForm>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviewAndWatchListFunction;
