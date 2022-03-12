import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
  const navigate = useNavigate();
  const toast = useToast();

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

      const documentReference = await addDoc(colRef, userData);
      
      if (userCredential && documentReference) {
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

      const q = query(colRef, where("uid", "==", userCredential.user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (!doc.data()) {
          throw Error("Oops something went wrong.");
        }
        setUser(doc.data());
      });

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
