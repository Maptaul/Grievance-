import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "./../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const secondaryApp = initializeApp(app.options, "Secondary");

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        email: email.toLowerCase(),
        role: "citizen",
        createdAt: new Date().toISOString(),
      };
      await axios.post("http://localhost:3000/users", userData);
      setRole("citizen");
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message || "Failed to create user");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create employee user without affecting current session
  const createEmployeeUser = async (email, password) => {
    const secondaryAuth = getAuth(secondaryApp);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );
      // Optionally, sign out the secondary auth instance
      await secondaryAuth.signOut();
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    setRole(null);
    setError(null);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const email = currentUser.email.toLowerCase();
          console.log("Fetching role for email:", email);
          const response = await axios.get(
            `http://localhost:3000/users/${email}`
          );
          if (response.data && response.data.role) {
            setRole(response.data.role);
            console.log("User role fetched:", response.data.role);
          } else {
            setRole("citizen");
            console.warn("No role found, defaulting to 'citizen'");
            await axios.post("http://localhost:3000/users", {
              email,
              role: "citizen",
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setError(error.message || "Failed to fetch user role");
          setRole("citizen");
        }
      } else {
        setRole(null);
        setError(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName || user?.email || "";
  const photoURL =
    user?.photoURL ||
    (user?.providerData && user.providerData[0]?.photoURL) ||
    null;

  const authInfo = {
    user,
    role,
    loading,
    error,
    createUser,
    createEmployeeUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
    resetPassword,
    displayName, // add to context
    photoURL, // add to context
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
