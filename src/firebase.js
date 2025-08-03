// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo_VC-e9v9PGLkzrt3iBsyrgfTMDj_0KY",
  authDomain: "newjobapplication-f74fd.firebaseapp.com",
  projectId: "newjobapplication-f74fd",
  storageBucket: "newjobapplication-f74fd.appspot.com",
  messagingSenderId: "810822418039",
  appId: "1:810822418039:web:00acc6ce959bd48ac59072",
  measurementId: "G-FB144N8ZTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);