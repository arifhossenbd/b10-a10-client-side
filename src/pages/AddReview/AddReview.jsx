import { useContext, useEffect, useState } from "react";
import CrudRelatedForm from "../../component/ReusableComponent/CrudRelatedForm/CrudRelatedForm";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import { FaArrowDown } from "react-icons/fa";
import Swal from "sweetalert2";
import crudOperation from "../../utils/apiClient";

const initialReview = {
  coverImg: "",
  title: "",
  genres: "",
  reviewDescription: "",
  rating: "",
  publishingYear: "",
  userName: "",
  userEmail: "",
  timeStamp: ""
};
const AddReview = () => {
  const { user, loading } = useContext(AuthContext);
  const [review, setReview] = useState(initialReview);
  const [fetching, setFetching] = useState(false);
  // Update user data when user loads
  useEffect(() => {
    if (user) {
      setReview((prevReview) => ({
        ...prevReview,
        userName: user?.displayName || "User not found!",
        userEmail: user?.email || "Email not found!",
        timeStamp: user?.metadata?.lastLoginAt || "Time not found!",
      }));
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (finalReview) => {
    setFetching(true)
    try {
      await crudOperation("POST", "/review", finalReview);
      Swal.fire({
        icon: "success",
        title: `Good job, ${user?.displayName}!`,
        text: "Your review added successfully!",
      });
      // Clear all input when successfully added review
      setReview(prevReview => ({...initialReview, userName: prevReview.userName, userEmail: prevReview.userEmail}));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fail to add review",
        text: error || "An error occurred. Please try again.",
      });
    } finally{
      setFetching(false);
    }
  };

  const heading = (
    <div className="space-y-1 pt-2 px-4 text-wrap">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-orbitron text-stone-600">
        Add Review
      </h2>
      <p className="text-stone-500 text-wrap flex items-center justify-center gap-1 text-xs md:text-sm">
        {`Welcome ${
          user?.displayName || "Dear User"
        }, please add your review below`}
        <FaArrowDown />{" "}
      </p>
    </div>
  );
  return (
    <div>
      <CrudRelatedForm
        children={heading}
        btnText="Add Review"
        review={review}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
        fetching={fetching}
      />
    </div>
  );
};

export default AddReview;
