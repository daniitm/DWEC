<script setup>
import { ref, computed, watch } from "vue";
import Tareas from "./Tareas.vue";
import { useFirestore, useCollection } from 'vuefire';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCurrentUser } from 'vuefire';
import Header from "./Header.vue";


import { onMounted } from 'vue';

onMounted(() => {
  if (!user.value) {
    window.location.hash = '/login';
  }
});

const totalTasks = computed(() => {
  console.log("Total tasks:", tasks.value ? tasks.value.length : 0);
  return tasks.value ? tasks.value.length : 0;
});
const pendingTasks = computed(() => {
  console.log("Pending tasks:", tasks.value ? tasks.value.filter(task => !task.completed).length : 0);
  return tasks.value ? tasks.value.filter(task => !task.completed).length : 0;
});




const emit = defineEmits(["clear-completed", "add-task", "delete-task", "update-task"]);
const user = useCurrentUser();
const db = useFirestore();

const newTaskText = ref("");

const tasksQuery = computed(() => {
  if (!user.value) return null;
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

function handleAddTask(event) {
  if ((event.key === "Enter" || event.type === "click") && newTaskText.value.trim()) {
    emit("add-task", { text: newTaskText.value });
    newTaskText.value = "";
  }
}

function handleDeleteTask(taskId) {
  emit("delete-task", taskId);
}

function handleUpdateTask(taskId, updatedData) {
  emit("update-task", taskId, updatedData);
}

const tareasOrdenadas = computed(() => {
  if (!tasks.value) return [];
  const priorityOrder = { "🔴 High": 1, "🟡 Normal": 2, "🟢 Low": 3 };
  return [...tasks.value].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
});
</script>

<template>
  <Header 
      :pending-tasks="pendingTasks"
      :total-tasks="totalTasks"
      @clear-completed="clearCompletedTasks"
  />
  <div class="centered-container">
    <div class="input-container">
      <input
        type="text"
        v-model="newTaskText"
        @keyup.enter="handleAddTask"
        placeholder="¿Qué quieres recordar?"
      />
      <button @click="handleAddTask">Agregar tarea</button>
    </div>
    <div class="task-list">
      <Tareas
        v-for="task in tareasOrdenadas"
        :key="task.id"
        :task="task"
        @delete-task="handleDeleteTask"
        @update-task="handleUpdateTask"
      />
    </div>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  max-width: 200px;
}

button:hover {
  background-color: #45a049;
}

.task-list {
  margin-top: 20px;
  width: 100%;
}
</style>