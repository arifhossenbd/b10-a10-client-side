import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import AuthAlert from "../../component/ReusableComponent/AuthAlert/AuthAlert";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the authenticated user
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(""); // State to store authentication errors

  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook to access the current location

  // Firebase authentication providers
  const googleProvider = new GoogleAuthProvider(); // Google authentication provider
  const facebookProvider = new FacebookAuthProvider(); // Facebook authentication provider
  const githubProvider = new GithubAuthProvider(); // GitHub authentication provider

  // Function to navigate to the previous location or home page
  const handleNavigate = () => {
    const from = location?.state?.from?.pathname || "/"; // Get the previous location or default to home
    navigate(from, { replace: true });
    return;
  };

  // Function to register a new user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user with Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true); // Set loading state to true during login
      const result = await signInWithPopup(auth, googleProvider); // Open Google login popup
      const user = result?.user; // Get the authenticated user
      setUser(user); // Update the user state
      AuthAlert({
        error: null,
        user,
        greeting: "Congrats",
        socialMethod: "Google",
      }); // Show success notification

      handleNavigate(); // Navigate to the target location
    } catch (error) {
      AuthAlert({ error: error || "Something went wrong" }); // Show error notification
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  // Function to log in a user with Facebook
  const loginWithFacebook = async () => {
    try {
      setLoading(true); // Set loading state to true during login
      const result = await signInWithPopup(auth, facebookProvider); // Open Facebook login popup
      const user = result?.user; // Get the authenticated user
      setUser(user); // Update the user state
      AuthAlert({
        error: null,
        user,
        greeting: "Congrats",
        socialMethod: "Facebook",
      }); // Show success notification
      handleNavigate(); // Navigate to the target location
    } catch (error) {
      AuthAlert({ error: error || "Something went wrong" });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to log in a user with GitHub
  const loginWithGithub = async () => {
    try {
      setLoading(true); // Set loading state to true during login
      const result = await signInWithPopup(auth, githubProvider); // Open GitHub login popup
      const user = result?.user; // Get the authenticated user
      setUser(user); // Update the user state
      AuthAlert({
        error: null,
        user,
        greeting: "Congrats",
        socialMethod: "GitHub",
      }); // Show success notification
      handleNavigate(); // Navigate to the target location
    } catch (error) {
      AuthAlert({ error: error || "Something went wrong" }); // Show error notification
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null); // Update the user state
      setLoading(false); // Reset loading state
    });
    return () => unsubscribe; // Cleanup function to unsubscribe from the listener
  }, []);

  // Function to update the user's profile
  const updateUser = async (updateInfo) => {
    try {
      if (!auth?.currentUser) throw new Error("Authenticated user not found"); // Check if the user is authenticated
      await updateProfile(auth?.currentUser, updateInfo); // Update the user's profile
      setUser({ ...auth.currentUser }); // Update the user state
    } catch (error) {
      setError(error); // Set error state if the update fails
    }
  };

  // Function to log out the user
  const logOutUser = async () => {
    await signOut(auth); // Sign out the user
    setUser(null); // Clear the user state
  };

  // Object containing authentication state and methods
  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    createUser,
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithGithub,
    updateUser,
    logOutUser,
  };

  // Provide the authentication context to the application
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
