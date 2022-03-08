import React, { useState, createContext, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  signUp: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // collection ref
  const colRef = collection(db, "users");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        console.log("user is authenticated");
      } else {
        setUser(null);
      }
    });

    return () => unsubAuth();
  }, []);

  const handleSignUp = async (email, password) => {
    setIsLoading(true);
    try {
      // Create user auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        uid: user.uid,
        avatar: "",
        name: "",
        bio: "",
        phone: 5555555555,
        email: user.email,
        password: "************",
      };

      // Create user data
      await addDoc(colRef, userData);

      setUser(userData);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user.uid);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  const value = {
    user: user,
    isLoading: isLoading,
    signUp: handleSignUp,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
