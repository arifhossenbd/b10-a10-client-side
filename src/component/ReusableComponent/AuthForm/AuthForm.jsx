import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import { transition } from "../../../config/transition";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider/AuthContext";
import Button from "../Buttons/Button";

const AuthForm = ({ children, name, photo, btnText, handleSubmit }) => {
  const { user, error, loginWithGoogle, loginWithFacebook, loginWithGithub } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordChecked = passwordRegex.test(passwordValue);
  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle()
    return result;
  }
  const handleLoginWithFacebook = async () => {
    const result = await loginWithFacebook()
    return result;
  }
  
  const handleLoginWithGithub = async () => {
    const result = await loginWithGithub()
    return result;
  }
  
  return (
    <div className="px-4 md:px-0 md:w-11/12 mx-auto my-8 mt-24 lg:mt-12 flex items-center min-h-screen">
      <div className="lg:flex justify-between mx-auto shadow-xl font-orbitron">
        <div className="text-center lg:text-left">{children}</div>
        <div className="card bg-base-100 mx-auto lg:w-96 shrink-0 rounded-none h-full">
          <div
            className={`p-4 md:p-0 md:pb-4 md:px-4 ${transition} text-center space-y-2`}
          >
            <form onSubmit={handleSubmit} className={`fieldset ${transition}`}>
              {name}
              <label className="fieldset-label font-semibold md:text-lg">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="border font-inter px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
                placeholder="Email"
              />
              <label className="fieldset-label font-semibold md:text-lg">
                Password
              </label>
              <div className="w-full relative">
                <input
                  name="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e?.target?.value)}
                  type={showPassword ? `text` : `password`}
                  className="border font-inter px-2 pr-8 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
                  placeholder="Password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-1 text-xl lg:text-2xl cursor-pointer"
                >
                  {passwordChecked ? (
                    <img
                      src="/assets/success.gif"
                      className="h-8 w-8"
                      alt="success"
                    />
                  ) : showPassword && showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </div>
              </div>
              {photo}
              <Button btnText={btnText} user={user} />
            </form>
            <div className="flex items-center gap-5 text-stone-200">
              <hr className="h-0.5 w-full" />
              <span className="font-semibold text-stone-500">or</span>
              <hr className="h-0.5 w-full" />
            </div>
            <div
              className={`flex justify-center items-center gap-4 lg:gap-8 ${transition}`}
            >
              <button onClick={handleLoginWithGoogle}
                className={`cursor-pointer text-lg md:text-xl hover:text-red-500 ${transition}`}
              >
                <FaGoogle />
              </button>
              <button  onClick={handleLoginWithFacebook}
                className={`cursor-pointer text-lg md:text-xl hover:text-blue-500 ${transition}`}
              >
                <FaFacebook />
              </button>
              <button  onClick={handleLoginWithGithub}
                className={`cursor-pointer text-lg md:text-xl hover:text-stone-600 ${transition}`}
              >
                <FaGithub />
              </button>
            </div>
            <span className="text-red-500 text-wrap text-sm font-inter">{error}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
