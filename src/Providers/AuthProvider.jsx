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
      await axios.post("https://grievance-server.vercel.app/users", userData);
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

  const createEmployeeUser = async (email, password) => {
    const secondaryAuth = getAuth(secondaryApp);
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password
    );
    // Optionally set a default photoURL for employees (e.g., a placeholder)
    await updateProfile(userCredential.user, {
      photoURL: "https://via.placeholder.com/150",
    });
    const userData = {
      email: email.toLowerCase(),
      role: "employee",
      createdAt: new Date().toISOString(),
      photo: "https://via.placeholder.com/150", // Store default photo in MongoDB
    };
    await axios.post("https://grievance-server.vercel.app/users", userData);
    await secondaryAuth.signOut();
    return userCredential;
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
      if (currentUser) {
        try {
          const email = currentUser.email.toLowerCase();
          // console.log(`Fetching role for email: ${email}`);
          const response = await axios.get(
            `https://grievance-server.vercel.app/users/${email}`
          );
          const mongoUser = response.data;
          // console.log("AuthProvider.jsx:114 MongoDB user data:", mongoUser);

          if (mongoUser && mongoUser.email) {
            let photoURL = currentUser.photoURL;
            if (mongoUser.photo) {
              photoURL = mongoUser.photo;
            } else if (
              currentUser.providerData &&
              currentUser.providerData[0]?.photoURL
            ) {
              photoURL = currentUser.providerData[0].photoURL;
            }

            setUser({
              ...currentUser,
              _id: mongoUser._id,
              email: mongoUser.email,
              name: mongoUser.name || currentUser.displayName,
              role: mongoUser.role,
              photoURL: photoURL,
            });
            setRole(mongoUser.role);
            // console.log(`AuthProvider.jsx:137 User role fetched: ${mongoUser.role}`);
          } else {
            const userData = {
              email,
              role: "citizen",
              createdAt: new Date().toISOString(),
            };
            const createResponse = await axios.post(
              "https://grievance-server.vercel.app/users",
              userData
            );
            const newMongoUser = createResponse.data;
            setUser({
              ...currentUser,
              _id: newMongoUser._id,
              email,
              role: "citizen",
            });
            setRole("citizen");
          }
        } catch (error) {
          setError(error.message || "Failed to fetch user role");
          setUser(currentUser); // Fallback to Firebase user
          setRole("citizen");
        }
      } else {
        setUser(null);
        setRole(null);
        setError(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName || user?.name || user?.email || "";
  // Always prefer MongoDB photo, then Firebase, then a default for citizens
  let photoURL = null;
  if (user?.photoURL) {
    photoURL = user.photoURL;
  } else if (user?.role === "citizen") {
    photoURL = "https://via.placeholder.com/150?text=Citizen";
  }

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
    displayName,
    photoURL,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
