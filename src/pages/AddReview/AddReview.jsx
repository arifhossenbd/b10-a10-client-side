import { useContext, useEffect, useState } from "react";
import CrudRelatedForm from "../../component/ReusableComponent/CrudRelatedForm/CrudRelatedForm";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import { FaArrowDown } from "react-icons/fa";
import Swal from "sweetalert2";
import crudOperation from "../../utils/apiClient";
import { Typewriter } from "react-simple-typewriter";

// Initial state for the review form
const initialReview = {
  coverImg: "",
  title: "",
  genres: "",
  reviewDescription: "",
  rating: "",
  publishingYear: "",
};
const AddReview = () => {
  const [userInfo, setUserInfo] = useState({
    reviewerName: "",
    reviewerEmail: "",
  });

  // Access user and loading state from the AuthContext
  const { user, loading } = useContext(AuthContext);

  // State to manage the review form data
  const [review, setReview] = useState(initialReview);

  // State to manage submit loading state during form submission
  const [submitLoading, setSubmitLoading] = useState(false);

  // Effect to update user-related fields in the review form when the user data is available
  useEffect(() => {
    if (user) {
      setUserInfo({
        reviewerName: user?.displayName || "User not found!", // Set reviewerName
        reviewerEmail: user?.email || "Email not found!", // Set reviewerEmail
        timeStamp: user?.metadata.lastLoginAt || "Time not found!", // Set reviewers time
      });
    }
  }, [user]);

  // Function to handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value, // Update the corresponding field in the review state
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (finalReview) => {
    setSubmitLoading(true); // Set setSubmitLoading state to true during API call
    try {
      // Send a POST request to add the review
      await crudOperation("POST", "review", finalReview);
      // Show success notification
      Swal.fire({
        icon: "success",
        title: `Good job, ${user?.displayName}!`,
        text: "Your review added successfully!",
      });
      // Reset the form fields after successfully submission
      setReview((prevReview) => ({
        ...initialReview,
        reviewerName: prevReview.reviewerName, // Retain reviewerName
        reviewerEmail: prevReview.reviewerEmail, // Retain reviewerEmail
      }));

      setReview(initialReview);
    } catch (error) {
      console.log(error);
      if (error.message === "HTTP error! Status: 409") {
        Swal.fire(
          "Warning",
          "This review already exists!, Please try again another review",
          "warning"
        );
        return;
      }
      // Show error notification if submission fail
      Swal.fire({
        icon: "error",
        title: "Fail to add review",
        text: error || "An error occurred. Please try again.",
      });
    } finally {
      setSubmitLoading(false); // Reset setSubmitLoading state after API call
    }
  };
  return (
    <div>
      {/* Reusable CRUDRelatedForm  component */}
      <CrudRelatedForm
        btnText="Add Review" // Button text
        review={{ ...review, ...userInfo }} // Review form data
        handleSubmit={handleSubmit} // Form submission handler
        handleChange={handleChange} // Input change handler
        loading={loading} // Loading state from AuthContext
        submitLoading={submitLoading} // submitLoading state during API call
      >
        <div className="space-y-1 pt-2 px-4 text-wrap">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-orbitron text-stone-600">
            Add Review
          </h2>
          <p className="text-stone-500 text-wrap flex items-center justify-center gap-1 text-xs md:text-sm">
            <Typewriter
              words={[
                `Welcome ${
                  user?.displayName || "Dear User"
                }, please add your review below`,
                "Share your thoughts with us!",
                "Your feedback matters!",
              ]}
              loop={5}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            <FaArrowDown />
          </p>
        </div>
      </CrudRelatedForm>
    </div>
  );
};

export default AddReview;
