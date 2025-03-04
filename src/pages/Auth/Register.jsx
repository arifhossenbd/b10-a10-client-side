import { Link, useLocation, useNavigate } from "react-router-dom";
import { transition } from "../../config/transition";
import { Helmet } from "react-helmet-async";
import AuthForm from "../../component/ReusableComponent/AuthForm/AuthForm";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";

const Register = () => {

  const { user, createUser, setLoading, setError } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const name = (
    <div className={`fieldset ${transition}`}>
      <label className="fieldset-label font-semibold md:text-lg">Name</label>
      <input
        name="name"
        type="text"
        className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
        placeholder="Full Name"
      />
    </div>
  );
  const photo = (
    <div>
      <label className="fieldset-label font-semibold md:text-lg">Photo</label>
      <input
        name="photo"
        type="text"
        className="border px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
        placeholder="Photo URL"
      />
    </div>
  );

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (user?.displayName === form.name.value || user?.email === email) return setError("You are already registered");
    if (!regex.test(password)) {
      setError(
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      setLoading(false);
      return;
    } else {
      setError("");
    }

    createUser(email, password)
      .then((result) => {
        setLoading(false);
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="pt-12">
      <Helmet title="Registration - Chill Gamer" />
      <AuthForm
        name={name}
        photo={photo}
        btnText="Registration"
        handleSubmit={handleRegister}
      >
        <div className="hero lg:min-w-96 min-h-full bg-[url(/assets/1.jpg)]">
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content">
            <div className="max-w-lg">
              <h1 className="mb-2 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold font-orbitron">
                Registration
              </h1>
              <p
                className={`mb-2 md:mb-4 text-sm md:text-base hover:text-red-600 ${transition}`}
              ></p>
              <h6 className="text-wrap text-sm">
                Already haven't account? Please{" "}
                <Link
                  className={`underline hover:text-red-500 tracking-widest ${transition}`}
                  to="/login"
                >
                  Login
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </AuthForm>
    </div>
  );
};

export default Register;
