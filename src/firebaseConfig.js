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
  onSnapshot,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAMyWk3dAAMpNGm9OXgyttXgoAdxQRGVYc",
  authDomain: "dev-authentication-3d7ea.firebaseapp.com",
  projectId: "dev-authentication-3d7ea",
  storageBucket: "dev-authentication-3d7ea.appspot.com",
  messagingSenderId: "185392183339",
  appId: "1:185392183339:web:82ec1c2693936c8b15526e",
});

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// AUTHENTICATION
export const auth = getAuth();

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// DATABASE
export const db = getFirestore();

export const updateUser = (uid, data) => {
  const documentReference = doc(db, "users", uid);
  return updateDoc(documentReference, data);
};

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
        bio: "",
        password: "************",
      });
    }
  } catch (err) {
    console.error("💥 ERROR", err.message);
  }
};

export const snapshotListener = (uid, callback) => {
  const documentReference = doc(db, "users", uid);
  return onSnapshot(documentReference, callback);
};

// STORAGE
const firebaseStorage = getStorage();

export const uploadPhoto = async (uid, file) => {
  const storageReference = ref(firebaseStorage, `avatars/${uid}${Date.now()}`);
  await uploadBytes(storageReference, file);
  const downloadURL = await getDownloadURL(storageReference);
  await updateUser(uid, { photoURL: downloadURL });
};
