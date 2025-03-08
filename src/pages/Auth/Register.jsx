import { Link, useLocation, useNavigate } from "react-router-dom";
import { transition } from "../../config/transition";
import { Helmet } from "react-helmet-async";
import AuthForm from "../../component/ReusableComponent/AuthForm/AuthForm";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  // Accessing authentication methods and state from AuthContext
  const {
    user,
    setUser,
    createUser,
    updateUser,
    setLoading,
    setError,
    loading,
  } = useContext(AuthContext);

  // Getting the current location and navigate function from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Regular expression to validate password strength
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Function to handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true during registration process

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    // Check if the user is already registered
    if (user?.displayName === form.name.value || user?.email === email) {
      Swal.fire({
        icon: "error",
        title: `${user?.displayName || "Dear User"}`,
        text: "An account already exists with a different sign-in method.",
      });
      setLoading(false); // Reset loading state
      return; // Exit the function
    }

    // Validate password strength using regex
    if (!passwordRegex?.test(password)) {
      setError(
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      setLoading(false); // Reset loading state
      return; // Exit the function
    } else {
      setError(""); // Clear error message if password is valid
    }

    try {

      // Create a new user using the AuthContext createUser method
      const result = await createUser(email, password);
      const newUser = result?.user;
      setUser(newUser); // Update the user state

        // If user creation is successful, update the user's profile with name and photo
      if (newUser) {
        await updateUser({ displayName: name, photoURL: photo });
        Swal.fire({
          icon: "success",
          title: `Congratulations, ${user?.displayName || "Dear User"}`,
          text: "You have successfully registered!",
        });
        // Navigate to the previous location or the home page
        navigate(location.state?.from?.pathname || "/", { replace: true });
      }
    } catch (error) {
       // Handle registration errors
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.message || "Something went wrong. Please try again later.",
      });
      setLoading(false); // Reset loading state
    } finally {
      setLoading(false); // Reset loading state after registration attempt
    }
  };

  const nameField = (
    <div className={`fieldset ${transition}`}>
      <label className="fieldset-label font-semibold md:text-lg">Name</label>
      <input
        name="name"
        type="text"
        className="border font-inter px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
        placeholder="Full Name"
      />
    </div>
  );
  const photoField = (
    <div>
      <label className="fieldset-label font-semibold md:text-lg">Photo </label>
      <input
        name="photo"
        type="text"
        className="border font-inter px-2 py-2 w-full border-stone-300 focus:outline-none focus:border-stone-400 rounded-none"
        placeholder="Photo URL"
      />
    </div>
  );

  return (
    <div className="pt-12">
      <Helmet title="Registration - Chill Gamer" />
      <AuthForm
        name={nameField}
        photo={photoField}
        btnText="Registration"
        handleSubmit={handleRegister}
        loading={loading}
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
              <h6 className="text-wrap text-sm font-inter">
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
