import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
// prettier-ignore
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext({
  user: null,
  loading: true,
  signUp: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  updateUser: (data) => {},
  signInWithGoogle: () => {},
});

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  // Subscribe to auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) console.log("✅ Authenticated!");
      setUser(user);
      setLoading(false);
    });

    // Unsubscribe
    return () => unsub();
  }, []);

  const usersId = user?.uid;

  // Subscribe to doc changes
  useEffect(() => {
    if (!usersId) return;
    const docRef = doc(db, "users", usersId);
    const unsub = onSnapshot(docRef, (doc) => setUser(doc.data()));

    // Unsubscribe
    return () => unsub();
  }, [usersId]);

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // REFACTOR !!!
      const userData = {
        photoURL: user.photoURL,
        displayName: user.displayName,
        bio: "I'm a bio waiting to be written.",
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: "Secret Password",
        uid: user.uid,
        firestore: true,
      };
      // create document
      await setDoc(doc(db, "users", user.uid), userData);

      // success
      if (user) {
        setUser(userData);
        navigate("/profile", { replace: true });
        setLoading(false);
      }
      // fail
      if (!user) {
        throw Error("Oops something went wrong creating your account.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(false);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // success
      if (docSnap.exists()) {
        setUser(docSnap.data());
        navigate("/profile", { replace: true });
        setLoading(false);
      }
      // fail
      if (!docSnap.exists()) {
        throw Error("Oops looks like your profile doesn't exist.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    toast({ status: "success", title: "You have successfully signed out." });
  };

  const updateUser = async function (data) {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, data);

    toast({ status: "success", title: "Profile Updated" });
    navigate("/profile", { replace: true });
  };

  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async function () {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const { user } = await signInWithPopup(auth, provider);

      ///////////////////////////////
      const userData = {
        photoURL: user.photoURL,
        displayName: user.displayName,
        bio: "I'm a bio waiting to be written.",
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: "Secret Password",
        uid: user.uid,
        firestore: true,
      };

      await setDoc(doc(db, "users", user.uid), userData);

      if (user) {
        setUser(userData);
        navigate("/profile", { replace: true });
        setLoading(false);
      }

      if (!user) {
        throw Error("Oops something went wrong creating your account.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    user: user,
    loading: loading,
    signUp: handleSignUp,
    login: handleLogin,
    logout: handleLogout,
    updateUser: updateUser,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
