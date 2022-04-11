import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAMyWk3dAAMpNGm9OXgyttXgoAdxQRGVYc",
  authDomain: "dev-authentication-3d7ea.firebaseapp.com",
  projectId: "dev-authentication-3d7ea",
  storageBucket: "dev-authentication-3d7ea.appspot.com",
  messagingSenderId: "185392183339",
  appId: "1:185392183339:web:82ec1c2693936c8b15526e",
});

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const db = getFirestore();

//////////////////////////////
export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const updateUser = async (uid, data) => {
  const documentReference = doc(db, "users", uid);
  await updateDoc(documentReference, data);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createUserDoc = async (user) => {
  try {
    const documentReference = doc(db, "users", user.uid);
    const documentSnapshot = await getDoc(documentReference);

    if (!documentSnapshot.exists()) {
      await setDoc(documentReference, {
        displayName: user.displayName || user.email.split("@")[0],
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        bio: "i am a bio waiting to be filled out!",
        password: "i am a secret!",
      });
    }
  } catch (err) {
    console.error("💥 ERROR", err.message);
  }
};
