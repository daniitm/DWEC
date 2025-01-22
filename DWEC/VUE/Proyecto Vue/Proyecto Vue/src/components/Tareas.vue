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
  padding: 15px;
  background-color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.task:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.task-completed {
  opacity: 0.7;
}

.task-checkbox {
  margin-right: 15px;
}

.task-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.task-details {
  flex-grow: 120;
  display: flex;
  flex-direction: column; 
  margin-left: 10px; 
  margin-right: 10px;
}

.task-text {
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.created-at {
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.task-actions {
  display: flex;
  align-items: center;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 2px solid;
  background-color: white;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.delete-button {
  background-color: transparent;
  color: #dc3545;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

.delete-button:hover {
  color: #c82333;
}

@media (max-width: 600px) {
  .task-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-actions {
    margin-top: 10px;
  }
}
</style>