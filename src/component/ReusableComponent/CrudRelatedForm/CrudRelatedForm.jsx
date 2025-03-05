import { transition } from "../../../config/transition";
import Button from "../Buttons/Button";

const CrudRelatedForm = ({
  children,
  btnText,
  review,
  handleSubmit,
  handleChange,
  loading
}) => {
  const { coverImg, title, genres, reviewDescription, rating, userName, userEmail, publishingYear  } = review || "";
  const onsubmit = (e) => {
    e.preventDefault();
    handleSubmit(review);
  };
  return (
    <div className="px-4 md:px-0 w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-8 mt-24 lg:mt-20">
      <div className="shadow-xl">
        <div className="text-center">{children}</div>
        <div className="p-4">
          <form
            onSubmit={onsubmit}
            className={`fieldset ${transition} font-orbitron`}
          >
            <div>
              <label className="fieldset-label font-semibold">
                Cover Image URL
              </label>
              <input
                onChange={handleChange}
                name="coverImg"
                value={coverImg}
                type="text"
                className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                placeholder="Cover Image URL"
              />
            </div>
            <div>
              <label className="fieldset-label font-semibold">Title</label>
              <input
                onChange={handleChange}
                name="title"
                value={title}
                type="text"
                className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                placeholder="Title"
              />
            </div>
            <select
              name="genres"
              value={genres || ""}
              onChange={handleChange}
              className="border px-1 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter appearance-none"
            >
              <option disabled value="">
                Pick Genres
              </option>
              <option value="Action">Action</option>
              <option value="Action Adventure">Action Adventure</option>
              <option value="Football">Football</option>
            </select>
            <div>
              <label className="fieldset-label font-semibold">Review</label>
              <input
                onChange={handleChange}
                name="reviewDescription"
                value={reviewDescription}
                type="text"
                className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                placeholder="Review"
              />
            </div>
            <div>
              <label className="fieldset-label font-semibold">Rating</label>
              <input
                onChange={handleChange}
                name="rating"
                value={rating}
                type="text"
                className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter"
                placeholder="Rating"
              />
            </div>
            <div>
              <label className="fieldset-label font-semibold">
                Publishing Year
              </label>
              <input
                disabled
                onChange={handleChange}
                name={loading ? "" : "publishingYear"}
                value={loading ? "" : publishingYear || ""}
                type="text"
                className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter ${loading ? "" : publishingYear && `cursor-not-allowed`}`}
                placeholder="Publishing Year"
              />
            </div>
            <div>
              <label className="fieldset-label font-semibold">
                User Name
              </label>
              <input
                disabled
                onChange={handleChange}
                name={loading ? "" : "userName"}
                value={loading ? "" : userName || ""}
                type="text"
                className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter ${userName && `cursor-not-allowed`}`}
                placeholder="User Name"
              />
            </div>
            <div>
              <label className="fieldset-label font-semibold">
                User Email
              </label>
              <input
                disabled
                onChange={handleChange}
                name={loading ? "" : "userEmail"}
                value={loading ? "" : userEmail || ""}
                type="text"
                className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter ${loading ? "" : userEmail && `cursor-not-allowed`}`}
                placeholder="User Email"
              />
            </div>
            <Button btnText={btnText} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrudRelatedForm;
