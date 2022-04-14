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
  loading: true,
});

export const AuthProvider = function ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChangedListener((user) => {
      if (user) {
        console.log("Authenticated");
        createUserDoc(user);
      }
      setCurrentUser(user);
      setLoading(false);
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

  const value = { currentUser, setCurrentUser, documentData, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
