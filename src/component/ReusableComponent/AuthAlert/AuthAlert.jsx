import Swal from "sweetalert2";

const AuthAlert = ({
  error = {},
  user,
  greeting,
  socialMethod,
  method,
}) => {
  if (error && error?.code === `auth/account-exists-with-different-credential`) {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "An account already exists with a different sign-in method.",
    });
  } else if (user) {
    Swal.fire({
      icon: "success",
      title: `${greeting}, ${
        user?.displayName ? user?.displayName : "Dear User"
      }!`,
      text: `${
        socialMethod
          ? `You are successfully logged in with ${socialMethod}`
          : `You are successfully ${method}`
      }`,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Authentication Error",
      text: "Please try again later",
    });
  }
  return;
};

export default AuthAlert;
