import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChangedListener, createUserDoc } from "../firebaseConfig";

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const AuthProvider = function ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChangedListener((user) => {
      if (user) {
        console.log("AUTHENTICATED");
        createUserDoc(user);
      }
      setCurrentUser(user);
    });

    return () => unsub();
  }, []);

  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
// GET DOC AND SAVE
