// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOwH_aT4Nz8SEYH883ZNBf6YnfwCS5X24",
  authDomain: "proyectopokeapi-8d7b6.firebaseapp.com",
  projectId: "proyectopokeapi-8d7b6",
  storageBucket: "proyectopokeapi-8d7b6.firebasestorage.app",
  messagingSenderId: "445246896302",
  appId: "1:445246896302:web:b8bcd8b61dd1d17c89953f",
  measurementId: "G-37N5H55JQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);