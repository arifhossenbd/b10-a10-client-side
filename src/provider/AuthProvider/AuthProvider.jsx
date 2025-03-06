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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleNavigate = () => {
    const from = location?.state?.from?.pathname || "/";
    navigate(from, {replace: true});
    return;
  }

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
     handleNavigate();
    } catch (error) {
      AuthAlert({ error: error || "Something went wrong" });
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
      handleNavigate();
    } catch (error) {
      AuthAlert({ error: error || "Something went wrong" });
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
      handleNavigate();
    } catch (error) {
      AuthAlert({ error: error || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // Update user profile
  const updateUser = async (updateInfo) => {
    try {
      if (!auth?.currentUser) throw new Error("Authenticated user not found");
    await updateProfile(auth?.currentUser, updateInfo);
    setUser({...auth.currentUser});
    } catch (error) {
      setError(error)
    }
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
