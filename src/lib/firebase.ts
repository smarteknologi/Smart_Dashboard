// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUi28660uiVuaCyWTdfJjoHACWpv9ZjK8",
  authDomain: "smarteknologi-9a640.firebaseapp.com",
  projectId: "smarteknologi-9a640",
  storageBucket: "smarteknologi-9a640.firebasestorage.app",
  messagingSenderId: "734868183188",
  appId: "1:734868183188:web:b25d0c2833c9a86ee5fc81",
  measurementId: "G-DR206QMF67"
};


// Initialize Firebase (avoid re-initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
