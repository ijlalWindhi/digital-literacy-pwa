// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyAuPxVPXckk9-gqMkhlx6-oI0EohSkho_8",
  authDomain: "digital-literacy-7701a.firebaseapp.com",
  projectId: "digital-literacy-7701a",
  storageBucket: "digital-literacy-7701a.firebasestorage.app",
  messagingSenderId: "342930311660",
  appId: "1:342930311660:web:455dc1e16887bece2318c9",
  measurementId: "G-WXL66Y7XND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
