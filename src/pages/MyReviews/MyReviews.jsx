import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import crudOperation from "../../utils/apiClient";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../component/Loading/Loading";
import NotFound from "../../component/NotFound/NotFound";

const MyReviews = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const emailOrName = user?.email || user?.displayName;
      if (!emailOrName) {
        console.log("Email or displayName is not available!");
        return;
      }
      try {
        const response = await crudOperation(
          "GET",
          `/myReviews/${encodeURIComponent(emailOrName)}`
        );
        console.log(response);
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
  if (loading) {
    return <Loading />;
  }

  if (!data || data?.length === 0) {
    return <NotFound text="Your review is not available!" />;
  }

  const handleDeleteReview = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmDelete.isConfirmed) {
      try {
        await crudOperation("DELETE", `/myReview/${id}`);
        setData(data?.filter(review => review?._id !== id));
        Swal.fire("Deleted", "Your review has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting review:", error);
        
        Swal.fire("Error", "Failed to delete the review", "error")
      }
    }
  };
  return (
    <div className="h-screen">
      <div className="px-4 md:px-0 md:w-11/12 mx-auto mt-24">
        <div>
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
                {data?.map((review, idx) => (
                  <tr key={review?._id} className="text-gray-500">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex gap-2 items-center">
                        <div className="avatar">
                          <div className="mask h-20 w-28 md:h-24 md:w-32">
                            <img
                              src={review?.coverImg}
                              alt="Avatar Tailwind CSS Component"
                            />
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
                      <button
                        className="btn btn-ghost hover:text-cyan-500 tooltip tooltip-info"
                        data-tip="Update"
                      >
                        <FaEdit className=" font-semibold text-base md:text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review?._id)}
                        className="btn btn-ghost tooltip tooltip-error hover:text-red-600"
                        data-tip="Delete"
                      >
                        <FaTrash className="font-semibold text-base md:text-lg" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
