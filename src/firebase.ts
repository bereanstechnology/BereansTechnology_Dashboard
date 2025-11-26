// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALEZPLFQsQQw_kC0tMnuDQ15R4k1xllPA",
  authDomain: "bereans-a9777.firebaseapp.com",
  projectId: "bereans-a9777",
  storageBucket: "bereans-a9777.firebasestorage.app",
  messagingSenderId: "69047928304",
  appId: "1:69047928304:web:416169cecfbbc46c18c935",
  measurementId: "G-D362Y0ZRGW",
};

const app = initializeApp(firebaseConfig);

// Optional (only works in browser)
let analytics: any = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
