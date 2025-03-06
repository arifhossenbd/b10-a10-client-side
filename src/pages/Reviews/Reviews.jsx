import { Link } from "react-router-dom";
import { transition } from "../../config/transition";
import Button from "../../component/ReusableComponent/Buttons/Button";

const Reviews = ({ reviews }) => {
  const { _id, coverImg, title, genres, rating, publishingYear } = reviews;

  return (
    <div className={`card bg-base-100 shadow-xl rounded-none ${transition} hover:shadow-2xl font-orbitron`}>
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
          <span className="text-yellow-500 font-semibold">Rating: {rating}</span>
          <span className="text-gray-400 ml-4">Year: {publishingYear}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/review-details/${_id}`}><Button btnText="View Details"/></Link>
        </div>
      </div>
    </div>
  );
};

export default Reviews;