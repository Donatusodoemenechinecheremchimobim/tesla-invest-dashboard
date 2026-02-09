import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- YOUR SPECIFIC CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyC6kcm2Yg9p3J0It_QmacbRIq2dk2FIXTI",
  authDomain: "investmenttesla-c7381.firebaseapp.com",
  projectId: "investmenttesla-c7381",
  storageBucket: "investmenttesla-c7381.firebasestorage.app",
  messagingSenderId: "572216478418",
  appId: "1:572216478418:web:4bf79f5a208e831baefb0b"
};

// Initialize Firebase
// We use a singleton pattern to prevent "Firebase App named '[DEFAULT]' already exists" errors
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in the app
export { auth, db, storage };