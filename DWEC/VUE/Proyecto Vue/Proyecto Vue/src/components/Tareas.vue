<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: Object
});

const emit = defineEmits(["delete-task", "update-task"]);

function toggleCompleted() {
  emit("update-task", props.task.id, { completed: !props.task.completed });
}

function changePriority(newPriority) {
  emit("update-task", props.task.id, { priority: newPriority });
}

function deleteTask() {
  emit("delete-task", props.task.id);
}

const formattedDate = computed(() => {
  return new Date(props.task.createdAt).toLocaleString();
});
</script>

<template>
  <div class="task">
    <input
      type="checkbox"
      :checked="props.task.completed"
      @change="toggleCompleted"
    />
    <div class="task-details">
      <span :class="{ completed: props.task.completed }">{{ props.task.text }}</span>
      <span class="created-at">Creada: {{ formattedDate }}</span>
    </div>
    <select @change="event => changePriority(event.target.value)" :value="props.task.priority">
      <option value="🔴 High">🔴 High</option>
      <option value="🟡 Normal">🟡 Normal</option>
      <option value="🟢 Low">🟢 Low</option>
    </select>
    <button class="delete-button" @click="deleteTask">Eliminar</button>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  position: relative;
  width: 500px;
}

.task-details {
  display: flex;
  flex-direction: column; /* Coloca los elementos verticalmente */
  margin-left: 10px; /* Espacio entre el checkbox y el texto */
  margin-right: 10px; /* Espacio entre el texto y el selector */
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.created-at {
  font-size: 12px;
  color: #666;
  margin-top: 5px; /* Añade espacio entre el texto y la hora */
}

select {
  margin-left: auto;
  margin-right: 10px;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>