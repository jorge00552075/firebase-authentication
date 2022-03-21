import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAMyWk3dAAMpNGm9OXgyttXgoAdxQRGVYc',
  authDomain: 'dev-authentication-3d7ea.firebaseapp.com',
  projectId: 'dev-authentication-3d7ea',
  storageBucket: 'dev-authentication-3d7ea.appspot.com',
  messagingSenderId: '185392183339',
  appId: '1:185392183339:web:82ec1c2693936c8b15526e',
});

export const auth = getAuth();
export const db = getFirestore();
