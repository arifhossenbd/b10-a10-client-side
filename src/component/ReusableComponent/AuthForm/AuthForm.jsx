import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import { transition } from "../../../config/transition";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider/AuthContext";

const AuthForm = ({ children, name, photo, btnText, handleSubmit }) => {
  const {user, error} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="px-4 md:px-0 md:w-11/12 mx-auto my-8 mt-12 lg:mt-12 flex items-center min-h-screen">
      <div className="lg:flex justify-between mx-auto shadow-xl">
        <div className="text-center lg:text-left">{children}</div>
        <div className="card bg-base-100 mx-auto lg:w-96 shrink-0 rounded-none h-full">
          <div className={`p-4 md:p-0 md:pb-4 md:px-4 ${transition} text-center space-y-2`}>
            <form onSubmit={handleSubmit} className={`fieldset ${transition}`}>
              {name}
              <label className="fieldset-label font-semibold md:text-lg">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
                placeholder="Email"
              />
              <label className="fieldset-label font-semibold md:text-lg">
                Password
              </label>
              <div className="w-full relative">
                <input
                  name="password"
                  type={showPassword ? `text` : `password`}
                  className="border px-2 pr-8 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
                  placeholder="Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 text-xl lg:text-2xl cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {photo}
              <button disabled={user?.displayName}
                className={`group flex items-center gap-1 btn bg-transparent border-red-600 text-red-600 hover:text-white hover:bg-red-600 mt-4 rounded-none ${transition} ${user?.displayName && `cursor-not-allowed`}`}
              >
                {btnText} 
                <FaArrowRight
                  className={`group-hover:translate-x-1 -translate-x-4 ${transition} group-hover:text-white text-transparent`}
                />
              </button>
            </form>
            <div className="flex items-center gap-5 text-stone-200">
              <hr className="h-0.5 w-full" />
              <span className="font-semibold text-stone-500">or</span>
              <hr className="h-0.5 w-full" />
            </div>
            <div
              className={`flex justify-center items-center gap-4 lg:gap-8 ${transition}`}
            >
              <button
                className={`cursor-pointer text-lg md:text-xl hover:text-red-500 ${transition}`}
              >
                <FaGoogle />
              </button>
              <button
                className={`cursor-pointer text-lg md:text-xl hover:text-blue-500 ${transition}`}
              >
                <FaFacebook />
              </button>
              <button
                className={`cursor-pointer text-lg md:text-xl hover:text-stone-600 ${transition}`}
              >
                <FaGithub />
              </button>
            </div>
            <span className="text-red-500 text-wrap text-sm">{error}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
