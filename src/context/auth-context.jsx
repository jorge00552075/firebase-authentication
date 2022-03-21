import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
// prettier-ignore
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AuthContext = createContext({
  user: null,
  isLoading: false,
  signUp: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  updateUser: (data) => {},
});

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // subscribe to authentication changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in');
        setUser({ uid: user.uid });
      } else {
        console.log('User is signed out');
        setUser(null);
      }
    });

    // unsubscribe to changes
    return () => unsub();
  }, []);

  const usersId = user?.uid;
  // subscribe to document changes
  useEffect(() => {
    if (!usersId) return;
    const docRef = doc(db, 'users', usersId);
    const unsub = onSnapshot(docRef, (doc) => setUser(doc.data()));

    // unsubscribe to changes
    return () => unsub();
  }, [usersId]);

  const handleSignUp = async (email, password) => {
    setIsLoading(true);
    try {
      // 1) Create user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = { uid: user.uid, email: user.email, password: '******' };

      // 2) Create document
      await setDoc(doc(db, 'users', user.uid), userData);

      // 3a) Success
      if (user) {
        setUser(userData);
        setIsLoading(false);
        navigate('/profile', { replace: true });
      }

      // 3b) Fail
      if (!user) {
        throw Error('Oops something went wrong creating your account.');
      }
    } catch (error) {
      // 4) Handle error
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
      });
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      // 1) Authenticate user
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // 2) Get document
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // 3a) Success
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setIsLoading(false);
        navigate('/profile', { replace: true });
      }

      // 3b) Fail
      if (!docSnap.exists()) {
        throw Error("Oops looks like your profile doesn't exist.");
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
      });
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    toast({ status: 'success', title: 'You have successfully signed out.' });
  };

  const updateUser = async function (data) {
    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, data);

    toast({ status: 'success', title: 'Profile Updated' });
    navigate('/profile', { replace: true });
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
