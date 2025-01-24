import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { conexion } from './firebaseAPIKey'
// ... other firebase imports

// const firebaseConfig = initializeApp(conexion);

export const firebaseApp = initializeApp(conexion)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const recordatorioRef = collection(db, 'recordatorio')