import React, { useState, useEffect, createContext } from "react";
import {
  onAuthStateChangedListener,
  createUserDoc,
  snapshotListener,
} from "../firebaseConfig";

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  documentData: null,
});

export const AuthProvider = function ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [documentData, setDocumentData] = useState(null);

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

  useEffect(() => {
    if (!currentUser) return;

    const unsub = snapshotListener(currentUser.uid, (doc) => {
      console.log("Current data: ", doc.data());
      setDocumentData(doc.data());
    });

    return () => unsub();
  }, [currentUser]);

  const value = { currentUser, setCurrentUser, documentData };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
