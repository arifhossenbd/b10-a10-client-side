import { useLocation } from "react-router-dom";
import { transition } from "../../../config/transition";
import Button from "../Buttons/Button";

const CrudRelatedForm = ({
  children, // Optional: Additional elements to be rendered at the top
  btnText, // Text for the submit button (e.g., "Add Review", "Update Review")
  review = {}, // Review object containing initial values for form fields
  handleSubmit, // Function to handle from submission
  handleChange, // Function to handle input changes
  loading, // Boolean: Show loading skeleton if true
  submitLoading, // Boolean: Used for submitLoading loading state if true
  updateLoading // Boolean: Used for Update Review loading state if true
}) => {
  // Destructure review properties (Default values used to prevent errors)
  const {
    coverImg,
    title,
    genres,
    reviewDescription,
    rating,
    reviewerName,
    reviewerEmail,
    publishingYear,
  } = review;

  // Handle form submission
  const onsubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSubmit(review); // Call parent function to submit data
  };

  // Get the current path from the URL
  const location = useLocation();
  const presentPath = location?.pathname; // Example: "/my-reviews"

  return (
    <div
      className={`${
        presentPath === "/my-reviews" || presentPath === "/my-watch-list"
          ? ``
          : `px-4  md:px-0 w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-8 mt-24 lg:mt-20`
      }`}
    >
      {/* Show the form if not in the loading state */}
      {!loading ? (
        <div className="shadow-xl">
          <div className="text-center">{children}</div>
          <div className="p-4">
            <form
              onSubmit={onsubmit}
              className={`fieldset ${transition} w-full font-orbitron`}
            >
              {/* Cover Image URL Input */}
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  Cover Image
                </label>
                <input
                  onChange={handleChange}
                  name="coverImg"
                  value={coverImg}
                  type="text"
                  className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                  placeholder="Cover Image URL"
                  required
                />
              </div>

              {/* Title Input */}
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  Title
                </label>
                <input
                  onChange={handleChange}
                  name="title"
                  value={title}
                  type="text"
                  className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                  placeholder="Title"
                  required
                />
              </div>

              {/* Genres Selecting Dropdown */}
              <select
                name="genres"
                value={genres || ""}
                onChange={handleChange}
                required
                className="border px-1 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter appearance-none"
              >
                <option disabled value="">
                  Pick Genres
                </option>
                <option value="RPG">RPG</option>
                <option value="FPS">FPS</option>
                <option value="Horror">Horror</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Multiplayer">Multiplayer</option>
                <option value="RPG, Action">RPG, Action</option>
                <option value="Action, Adventure">Action, Adventure</option>
                <option value="Action, Survival">Action, Survival</option>
                <option value="Adventure, Horror">Adventure, Horror</option>
                <option value="FPS, Multiplayer">FPS, Multiplayer</option>
                <option value="Horror, Puzzle-Platformer">
                  Horror, Puzzle-Platformer
                </option>
              </select>

              {/* Review Description */}
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  Review
                </label>
                <input
                  onChange={handleChange}
                  name="reviewDescription"
                  value={reviewDescription}
                  type="text"
                  className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                  placeholder="Review Details"
                  required
                />
              </div>

              {/*  Rating Input */}
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  Rating
                </label>
                <input
                  onChange={handleChange}
                  name="rating"
                  value={rating}
                  type="number"
                  className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                  placeholder="Rating"
                  required
                />
              </div>

              {/* Publishing Year Input */}
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  Publishing Year
                </label>
                <input
                  onChange={handleChange}
                  name={"publishingYear"}
                  value={publishingYear}
                  type="number"
                  className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter`}
                  placeholder="Publishing Year"
                  required
                />
              </div>

              {/* User information (Read Only) */}
              <div className="tooltip tooltip-top tooltip-warning space-y-1"
              data-tip="Default value so not changeable!">
                <div>
                  <label className="fieldset-label font-semibold md:text-base">
                    User Name
                  </label>
                  <input
                    disabled
                    readOnly
                    value={loading ? "" : reviewerName}
                    type="text"
                    className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter
                  }`}
                    placeholder="User Name"
                  />
                </div>
                <div>
                  <label className="fieldset-label font-semibold md:text-base">
                    User Email
                  </label>
                  <input
                    readOnly
                    disabled
                    value={loading ? "" : reviewerEmail}
                    type="text"
                    className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter
                  }`}
                    placeholder="User Email"
                  />
                </div>
              </div>
              <Button btnText={btnText} submitLoading={submitLoading || updateLoading} />
            </form>
          </div>
        </div>
      ) : (

        // Show loading skeleton while user 
        <div className="flex flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="skeleton h-4 w-full"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrudRelatedForm;
