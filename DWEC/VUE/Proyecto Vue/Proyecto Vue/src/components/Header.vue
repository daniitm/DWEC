<script setup>
const props = defineProps({
  pendingTasks: Number,
  totalTasks: Number
});

const emit = defineEmits(["clear-completed"]);

function handleClearCompleted(event) {
  event.preventDefault(); // Previene cualquier acción por defecto
  event.stopPropagation(); // Detiene la propagación del evento
  console.log("Emitiendo evento clear-completed");
  emit('clear-completed');
  return false;
}
</script>

<template>
  <header class="header">
    <h1>Gestor de Tareas</h1>
    <p>📊 {{ pendingTasks }} tareas pendientes de un total de {{ totalTasks }} tareas</p>
    <div class="actions">
      <a href="#" class="clear-completed" @click.prevent="handleClearCompleted">🗑️ Borrar tareas completadas</a>
    </div>
  </header>
</template>


<style scoped>
.header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}
.clear-completed {
  display: block;
  margin-top: 10px;
  color: #f44336;
  text-decoration: none;
  cursor: pointer;
}
</style>