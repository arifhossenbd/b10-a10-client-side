import { useContext, useState } from "react";
import CrudRelatedForm from "../../component/ReusableComponent/CrudRelatedForm/CrudRelatedForm";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import { FaArrowDown } from "react-icons/fa";

const AddReview = () => {
  const { user, loading } = useContext(AuthContext);
  const timeStamp = Number(user?.metadata?.lastLoginAt);
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const [review, setReview] = useState({
    coverImg: "",
    title: "",
    genres: "",
    reviewDescription: "",
    rating: "",
    userName: user?.displayName || "",
    userEmail: user?.email || "",
    publishingYear: year || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (finalReview) => {
    console.log(finalReview);
    try {
      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalReview),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Review added successfully!");
      } else {
        alert("Failed to add review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const heading = (
    <div className="space-y-1 pt-2 px-4 text-wrap">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-orbitron text-stone-600">Add Review</h2>
      <p className="text-stone-500 text-wrap flex items-center justify-center gap-1 text-xs md:text-sm">{`Welcome ${user?.displayName}, please add your review below`}<FaArrowDown/> </p>
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
        publishingYear={year}
        loading={loading}
      />
    </div>
  );
};

export default AddReview;
