import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
  apiKey: "AIzaSyA9YdcAFGg879B5LkEiMLNIJCuZq6qvObk",
  authDomain: "proyecto-recordatorio-7f2cb.firebaseapp.com",
  projectId: "proyecto-recordatorio-7f2cb",
  storageBucket: "proyecto-recordatorio-7f2cb.firebasestorage.app",
  messagingSenderId: "985418712199",
  appId: "1:985418712199:web:c82635b07912a066baa422",
  measurementId: "G-TQDQBKJSX0"
};

export const firebaseApp = initializeApp(firebaseConfig)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const recordatorioRef = collection(db, 'recordatorio')