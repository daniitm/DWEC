<script setup>
import { useRouter } from 'vue-router';
  
const router = useRouter();
  
function goToRegister() {
  window.location.hash = '#/login';
}
</script>

<template>
    <div class="landing">
        <header>
            <h1>Bienvenido a mi Proyecto Recordatorio</h1>
            <p>Apunta tus tareas del dia a día y gestionalas a tu gusto</p>
        </header>
  
        <main>
            <section class="features">
                <h2>Características principales</h2>
                <ul>
                    <li>● Gestión de tareas simple</li>
                    <li>● Sincronización en tiempo real</li>
                    <li>● Acceso desde cualquier dispositivo</li>
                    <li>● Organización por prioridades</li>
                </ul>
            </section>
  
            <section class="cta">
                <h2>Comienza ahora</h2>
                <p>Regístrate y empieza a organizar tu día</p>
                <br>
                <button @click="goToRegister">Comenzar</button>
            </section>
        </main>
    </div>
</template>
  

  
<style scoped>
.landing {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.5em;
  color: #fff;
}

h2 {
  font-size: 1.8em;
  color: #fff;
}

.features {
  margin-bottom: 40px;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}

.cta {
  text-align: center;
  background-color: #333;
  padding: 30px;
  border-radius: 8px;
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

button:hover {
  background-color: #45a049;
}
</style>