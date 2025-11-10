// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvlMPsxM5Xt9a0Wo1pbMPKxz4JUqgb9N8",
  authDomain: "daily-fix-auth.firebaseapp.com",
  projectId: "daily-fix-auth",
  storageBucket: "daily-fix-auth.firebasestorage.app",
  messagingSenderId: "951389033131",
  appId: "1:951389033131:web:8161f794391b200c505dee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);