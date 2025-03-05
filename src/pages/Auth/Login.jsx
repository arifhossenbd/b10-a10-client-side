import { Helmet } from "react-helmet-async";
import AuthForm from "../../component/ReusableComponent/AuthForm/AuthForm";
import { transition } from "../../config/transition";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import Swal from "sweetalert2";
import AuthAlert from "../../component/ReusableComponent/AuthAlert/AuthAlert";

const Login = () => {
  const { login, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await login(email, password);
      const loggedUser = result?.user;
      if (loggedUser?.email !== email) {
        AuthAlert({
          error: null,
          user: loggedUser,
          greeting: "Welcome Back",
          method: "login",
        });
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "An account already exists with a different sign-in method.",
        });
        setLoading(false);
      }
    } catch (error) {
      AuthAlert({ error: error?.message || "Login failed" });
      setLoading(false)
    }
  };

  return (
    <div>
      <Helmet title="Login - Chill Gamer" />
      <AuthForm btnText="Login" handleSubmit={handleLogin}>
        <div className="hero lg:min-w-96 min-h-full bg-[url(/assets/1.jpg)]">
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content">
            <div className="max-w-lg text-center">
              <h1 className="mb-2 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold font-orbitron">
                Login
              </h1>
              <p
                className={`mb-2 md:mb-4 text-sm md:text-base hover:text-red-600 ${transition}`}
              ></p>
              <h6 className="text-wrap text-sm font-inter">
                Don't haven't account? Please{" "}
                <Link
                  className={`underline hover:text-red-500 tracking-widest ${transition}`}
                  to="/register"
                >
                  Registration
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </AuthForm>
    </div>
  );
};

export default Login;
