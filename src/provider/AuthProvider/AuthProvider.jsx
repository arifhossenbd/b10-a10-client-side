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
import { useNavigate } from "react-router-dom";
import AuthAlert from "../../component/ReusableComponent/AuthAlert/AuthAlert";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();

  // Registration method
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login method
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log with Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result?.user;
      setUser(user);
      AuthAlert({
        error: null,
        user,
        greeting: "Congrats",
        socialMethod: "Google",
      });
      navigate("/", { state: { from: location } });
    } catch (error) {
      AuthAlert({ error: error || {} });
    } finally {
      setLoading(false);
    }
  };

  // log with Facebook
  const loginWithFacebook = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result?.user;
      setUser(user);
      AuthAlert({
        error: null,
        user,
        greeting: "Congrats",
        socialMethod: "Facebook",
      });
      navigate("/", { state: { from: location } });
    } catch (error) {
      AuthAlert({ error: error || {} });
    } finally {
      setLoading(false);
    }
  };

  // log with GitHub
  const loginWithGithub = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, githubProvider);
      const user = result?.user;
      setUser(user);
      AuthAlert({
        error: null,
        user,
        greeting: "Congrats",
        socialMethod: "GitHub",
      });
      navigate("/", { state: { from: location } });
    } catch (error) {
      AuthAlert({ error: error || {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser !== null
        ? setUser(currentUser) && setLoading(false)
        : setLoading(false) && setUser(null);
      return () => {
        unsubscribe();
      }; // Clearance
    });
  }, []);

  // Update user profile
  const updateUser = async (updateInfo) => {
    if (!auth?.currentUser) throw new Error("Authenticated user not found");
    await updateProfile(auth?.currentUser, updateInfo);
    setUser({ ...auth?.currentUser });
  };

  // logout user
  const logOutUser = async () => {
    await signOut(auth);
    setUser(null);
  };

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
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
