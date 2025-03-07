import { transition } from "../../../config/transition";
import Button from "../Buttons/Button";

const CrudRelatedForm = ({
  children,
  btnText,
  review = {},
  handleSubmit,
  handleChange,
  loading,
  fetching
}) => {
  const {
    coverImg,
    title,
    genres,
    reviewDescription,
    rating,
    userName,
    userEmail,
    publishingYear
  } = review;
  const onsubmit = (e) => {
    e.preventDefault();
    handleSubmit(review);
  };
  return (
    <div className="px-4 md:px-0 w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-8 mt-24 lg:mt-20">
      {!loading ? (
        <div className="shadow-xl">
          <div className="text-center">{children}</div>
          <div className="p-4">
            <form
              onSubmit={onsubmit}
              className={`fieldset ${transition} font-orbitron`}
            >
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
                <option value="Horror, Puzzle-Platformer">Horror, Puzzle-Platformer</option>
              </select>
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
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  User Name
                </label>
                <input
                  disabled
                  readOnly
                  onChange={handleChange}
                  name="userName"
                  value={loading ? "" : userName}
                  type="text"
                  className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter cursor-not-allowed tooltip tooltip-warning
                  }`}
                  placeholder="User Name"
                  data-tip="You can't access this field!"
                />
              </div>
              <div>
                <label className="fieldset-label font-semibold md:text-base">
                  User Email
                </label>
                <input
                readOnly
                  disabled
                  onChange={handleChange}
                  name="userEmail"
                  value={loading ? "" : userEmail}
                  type="text"
                  className={`border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none text-xs font-inter cursor-not-allowed tooltip tooltip-warning
                  }`}
                  placeholder="User Email"
                  data-tip="You can't access this field!"
                />
              </div>
              <Button btnText={btnText} fetching={fetching} />
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      )}
    </div>
  );
};

export default CrudRelatedForm;
