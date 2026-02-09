// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6kcm2Yg9p3J0It_QmacbRIq2dk2FIXTI",
  authDomain: "investmenttesla-c7381.firebaseapp.com",
  projectId: "investmenttesla-c7381",
  storageBucket: "investmenttesla-c7381.firebasestorage.app",
  messagingSenderId: "572216478418",
  appId: "1:572216478418:web:9e8610bca57ad4b4aefb0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the "Brain" so other pages can use it
export const auth = getAuth(app);
export const db = getFirestore(app);