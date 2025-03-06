import Swal from "sweetalert2";

const AuthAlert = ({
  error,
  user,
  greeting,
  socialMethod
}) => {
  // Handling specific error case when the account already exists with a different sign-in method
  if (error?.code === "auth/account-exists-with-different-credential") {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "An account already exists with a different sign-in method. Please use the other sign-in method to login.",
    });
    return;
  } 
  // If an error occurs (excluding the account-exists case)
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Authentication Error",
      text: error?.message || "An error occurred during authentication. Please try again later.",
    });
    return;
  }

  // Handling when the user is already logged in (success case)
 if (user) {
    Swal.fire({
      icon: "success",
      title: `${greeting || "Welcome back"}, ${
        user?.displayName ? user?.displayName : "Dear User"
      }!`,
      text: `${
        socialMethod
          && `You are successfully logged in with ${socialMethod}.`
      }`,
    });
  }
};

export default AuthAlert;
