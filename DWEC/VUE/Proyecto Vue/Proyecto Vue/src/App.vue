<script setup>
import { reactive, computed } from "vue";
import Login from "./components/Login.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ListaTareas from "./components/ListaTareas.vue";
import { useCollection, useFirestore } from "vuefire";
import { addDoc, collection, updateDoc, deleteDoc, doc, query, orderBy, getDoc, getDocs } from "firebase/firestore";
import { useCurrentUser } from 'vuefire';
import { where } from "firebase/firestore";
import { watch } from 'vue';

import { inject } from 'vue';

const currentView = inject('currentView');




const db = useFirestore();

const tasksCollection = collection(db, 'recordatorios');

// Usuarios
const user = useCurrentUser()

watch(user, (newUser) => {
  if (newUser) {
    console.log("Usuario cambiado, actualizando tareas para:", newUser.uid);
    // La consulta se actualiza automáticamente gracias a useCollection y el computed
  } else {
    console.log("Usuario cerró sesión");
  }
});

// Query para obtener las tareas ordenadas por fecha de creación
const tasksQuery = computed(() => {
  if (!user.value) {
    console.log("No hay usuario autenticado");
    return null;
  }
  console.log("Creando query para usuario:", user.value.uid);
  return query(
    collection(db, "recordatorios"),
    where("userId", "==", user.value.uid),
    orderBy("createdAt", "desc")
  );
});

const tasks = useCollection(tasksQuery);

watch(tasks, (newTasks) => {
  console.log("Tareas actualizadas:", newTasks);
}, { deep: true });

const totalTasks = computed(() => {
  console.log("Total tasks:", tasks.value ? tasks.value.length : 0);
  return tasks.value ? tasks.value.length : 0;
});
const pendingTasks = computed(() => {
  console.log("Pending tasks:", tasks.value ? tasks.value.filter(task => !task.completed).length : 0);
  return tasks.value ? tasks.value.filter(task => !task.completed).length : 0;
});

async function addTask(taskData) {
  if (!user.value || !taskData || !taskData.text || !taskData.text.trim()) {
    console.log("No se puede añadir la tarea: usuario no autenticado o datos de tarea inválidos");
    return;
  }

  const newTask = {
    userId: user.value.uid,
    text: taskData.text,
    priority: "🟡 Normal",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, "recordatorios"), newTask);
    console.log("Tarea añadida con ID:", docRef.id, "para usuario:", user.value.uid);
    console.log("Datos de la tarea:", newTask);
    return { id: docRef.id, ...newTask };
  } catch (error) {
    console.error("Error al añadir tarea:", error);
  }
}

async function updateTask(taskId, updatedData) {
  if (!user.value) return;
  try {
    const taskRef = doc(db, 'recordatorios', taskId);
    await updateDoc(taskRef, updatedData);
    const index = tasks.value.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedData };
    }
    console.log(`Tarea con ID ${taskId} actualizada correctamente`);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
  }
}

async function deleteTask(taskId) {
  if (!user.value) return;
  try {
    await deleteDoc(doc(db, 'recordatorios', taskId));
    console.log(`Tarea con ID ${taskId} eliminada correctamente`);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
}

async function clearCompletedTasks() {
  if (!user.value) return;
  console.log("Iniciando clearCompletedTasks");
  try {
    const completedTasks = tasks.value.filter(task => task.completed);
    console.log(`Encontradas ${completedTasks.length} tareas completadas para eliminar`);
    
    for (const task of completedTasks) {
      console.log(`Eliminando tarea: ${task.id}`);
      await deleteTask(task.id);
    }
    
    console.log("Tareas completadas eliminadas correctamente");
  } catch (error) {
    console.error("Error al eliminar tareas completadas:", error);
  }
}
</script>

<template>
  <div>
    <nav v-if="!user">
      <a href="#/" v-if="!user">Inicio</a> |
      <a href="#/login" v-if="!user">Iniciar sesión</a>
    </nav>
    <nav v-if="user">
      <a href="#/login" v-if="user">Cerrar sesión</a> |
      <a href="#/tareas" v-if="user">Mis tareas</a>
    </nav>
    
    <component :is="currentView" 
    :tasks="tasks"
      @add-task="addTask"
      @delete-task="deleteTask"
      @update-task="updateTask"
      @clear-completed="clearCompletedTasks"/>

    <Footer />
  </div>

</template>

<style scoped>
.container {
  padding: 20px;
}
</style>