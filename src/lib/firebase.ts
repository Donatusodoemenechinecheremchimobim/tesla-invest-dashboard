import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlK1Bu8FKheJEbG2yS1NbxC9kyy_y9qvg",
  authDomain: "tesla-c6822.firebaseapp.com",
  projectId: "tesla-c6822",
  storageBucket: "tesla-c6822.firebasestorage.app",
  messagingSenderId: "467190127133",
  appId: "1:467190127133:web:f4f507c418787c1b0984f4"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;