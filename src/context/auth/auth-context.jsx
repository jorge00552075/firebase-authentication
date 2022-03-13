import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  signUp: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  updateUser: (data) => {},
});

export const AuthProvider = function ({ children }) {
  // hooks
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // subscribe to authentication changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Authenticated === true");
        setUser(user.uid);
      } else {
        console.log("❌ Authenticated === false");
        setUser(null);
      }
    });

    // unsubscribe to changes
    return () => unsub();
  }, []);

  // Subscribe to document changes
  let docRef;
  if (user && user.uid) {
    docRef = doc(db, "users", user.uid);
  }

  useEffect(() => {
    if (!docRef) return;
    const unsub = onSnapshot(docRef, (doc) => {
      setUser(doc.data());
    });

    // unsubscribe to changes
    return () => unsub();
  }, [docRef]);

  const handleSignUp = async (email, password) => {
    setIsLoading(true);
    // prettier-ignore
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const userData = {
        uid: userCredential.user.uid,
        avatar: "",
        name: "",
        bio: "",
        phone: "5555555555",
        email: userCredential.user.email,
        password: "************"
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      
      if (userCredential) {
        setUser(userData);
        toast({
          title: "Account created", 
          description: "We've created your account for you.", 
          status: "success",
          duration: 3000,
          isClosable: true
        });
        setIsLoading(false);
        navigate("/account", { replace: true });
      } else {
        throw Error("Oops something went wrong!");
      }
    } catch (error) {
      toast({
        title: "Error creating account", 
        description: error.message, 
        status: "error",
        duration: 3000,
        isClosable: true
      });
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
      const docRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
        // show error message
      }
      toast({
        title: "Account created",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      navigate("/account", { replace: true });
    } catch (error) {
      toast({
        title: "Error creating account",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  const updateUser = async function (data) {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, data);
    // update state

    toast({
      title: "Success",
      description: "You successfully updated your account 🎉",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/account", { replace: true });
  };

  const value = {
    user: user,
    isLoading: isLoading,
    signUp: handleSignUp,
    login: handleLogin,
    logout: handleLogout,
    updateUser: updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
