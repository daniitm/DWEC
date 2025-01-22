<script setup>
import { GoogleAuthProvider, GithubAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup, signOut } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { ref } from 'vue';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const auth = useFirebaseAuth()
const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()
const user = useCurrentUser()
const db = useFirestore();

const usuario = getAuth()

// Estado para registro
const registerNombre = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

// Estado para inicio de sesión
const loginEmail = ref('')
const loginPassword = ref('')

// Estado para mostrar el formulario de registro
const showRegisterForm = ref(false)

// ... (mantén las funciones loginGoogle, loginGithub, registrarUsuario, iniciarSesionEmail, logout y createOrUpdateUser como estaban)
async function loginGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    await createOrUpdateUser(result.user);
    console.log("Inicio de sesión con Google correcto");
    window.location.hash = '/tareas';
  } catch (error) {
    console.error('Error en inicio de sesión con Google', error);
  }
}

async function loginGithub() {
  try {
    const result = await signInWithPopup(auth, githubAuthProvider);
    await createOrUpdateUser(result.user);
    console.log("Inicio de sesión con GitHub correcto");
    window.location.hash = '/tareas';
  } catch (error) {
    console.error('Error en inicio de sesión con GitHub', error);
  }
}

async function registrarUsuario() {
  try {
    const userCredential = await createUserWithEmailAndPassword(usuario, registerEmail.value, registerPassword.value);
    await createOrUpdateUser({...userCredential.user, displayName: registerNombre.value});
    console.log("Usuario registrado:", userCredential.user);
    
    // Limpiar campos de registro
    registerNombre.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    
    // Cambiar al formulario de inicio de sesión
    showRegisterForm.value = false;
    
    // No es necesario iniciar sesión manualmente, Firebase lo hace automáticamente
    console.log("Sesión iniciada automáticamente después del registro");
    window.location.hash = '/tareas';
  } catch (error) {
    console.error("Error en registro", error);
  }
}

async function iniciarSesionEmail(limpiarCampos = true) {
  try {
    const userCredential = await signInWithEmailAndPassword(usuario, loginEmail.value, loginPassword.value);
    console.log("Inicio de sesión con email correcto");
    window.location.hash = '/tareas';
    if (limpiarCampos) {
      // Limpiar campos después del inicio de sesión
      loginEmail.value = '';
      loginPassword.value = '';
    }
  } catch (error) {
    console.error("Error en inicio de sesión con email", error);
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log("Sesión cerrada correctamente");
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
}

async function createOrUpdateUser(user) {
  const userRef = doc(db, 'usuarios', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      nombre: user.displayName || registerNombre.value,
      email: user.email,
      userId: user.uid
    });
    console.log("Nuevo usuario añadido a la base de datos");
  } else {
    console.log("Usuario existente, no se requiere actualización");
  }
}

function toggleRegisterForm() {
  showRegisterForm.value = !showRegisterForm.value
}
</script>

<template>
  <div v-if="user" class="logout-container">
    <p>Hola {{ user.displayName || user.email }}</p>
    <h2>Cerrar sesión:</h2>
    <div class="logout-logout">
      <button @click="logout">Cerrar sesión</button>
    </div>
  </div>

  <div v-else>
    <div v-if="!showRegisterForm" class="auth-container">
      <h2>Iniciar sesión con email:</h2>
      <form @submit.prevent="iniciarSesionEmail">
        <input type="email" v-model="loginEmail" placeholder="email" required>
        <input type="password" v-model="loginPassword" placeholder="contraseña" required>
        <input type="submit" value="Iniciar sesión">
      </form>
      
      <p>¿No tienes una cuenta? <a href="#" @click.prevent="toggleRegisterForm">Regístrate aquí</a></p>

      <h3>Inicia sesión con:</h3>
      <div class="social-login">
        <button @click="loginGoogle">Google</button>
        <button @click="loginGithub">GitHub</button>
      </div>
    </div>

    <div v-else class="auth-container">
      <h2>Registrarse:</h2>
      <form @submit.prevent="registrarUsuario">
        <input type="email" v-model="registerEmail" placeholder="email" required>
        <input type="password" v-model="registerPassword" placeholder="contraseña" required>
        <input type="submit" value="Registrarse">
      </form>
      
      <p>¿Ya tienes una cuenta? <a href="#" @click.prevent="toggleRegisterForm">Inicia sesión aquí</a></p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
}

.logout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
}

h2 {
  font-size: 1.8em;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type="email"],
input[type="password"],
input[type="submit"] {
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
}

input[type="submit"] {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 4px;
  margin: 5px;
}

button:hover {
  background-color: #45a049;
}

a {
  color: #4caf50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.logout-logout {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

p {
  text-align: center;
  margin-top: 20px;
}

.user-info {
  text-align: center;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 4px;
}
</style>