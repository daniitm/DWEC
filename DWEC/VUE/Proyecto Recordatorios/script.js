$(document).ready(function () {
    const taskList = $('#taskList');
    const taskInput = $('#taskInput');
    const taskStats = $('#taskStats');
    const clearCompleted = $('#clearCompleted');

    // Cargar tareas desde LocalStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        renderTasks(tasks);
    };

    // Guardar tareas en LocalStorage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Renderizar las tareas
    const renderTasks = (tasks) => {
        taskList.empty();
        tasks.sort((a, b) => b.priority - a.priority); // Ordenar por prioridad
        tasks.forEach((task, index) => {
            const taskElement = $(`
                <li class="task-item ${task.completed ? 'completed' : ''}">
                    <div>
                        <span class="task-priority ${getPriorityClass(task.priority)}" data-index="${index}">
                            ${getPriorityLabel(task.priority)}
                        </span>
                        <span class="task-text">${task.text}</span>
                    </div>
                    <div class="task-actions">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-complete" data-index="${index}">
                        <button class="task-delete" data-index="${index}">Eliminar</button>
                    </div>
                </li>
            `);
            taskList.append(taskElement);
        });
        updateStats(tasks);
    };

    // Actualizar estadísticas
    const updateStats = (tasks) => {
        const totalTasks = tasks.length;
        const pendingTasks = tasks.filter(task => !task.completed).length;
        taskStats.text(`${pendingTasks} Tareas pendientes de un total de ${totalTasks}`);
    };

    // Crear una nueva tarea
    const addTask = (text) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({
            text,
            priority: 1, 
            completed: false,
            createdAt: new Date(),
        });
        saveTasks(tasks);
        renderTasks(tasks);
    };

    // Obtener clase de prioridad
    const getPriorityClass = (priority) => {
        return ['low-priority', 'normal-priority', 'high-priority'][priority];
    };

    // Obtener etiqueta de prioridad
    const getPriorityLabel = (priority) => {
        return ['Low', 'Normal', 'High'][priority];
    };

    // Cambiar prioridad
    const changePriority = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].priority = (tasks[index].priority + 1) % 3;
        saveTasks(tasks);
        renderTasks(tasks);
    };

    // Cambiar estado de completado
    const toggleComplete = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks(tasks);
    };

    // Borrar una tarea
    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks(tasks);
    };

    // Borrar tareas completadas
    const clearCompletedTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const remainingTasks = tasks.filter(task => !task.completed);
        saveTasks(remainingTasks);
        renderTasks(remainingTasks);
    };

    // Eventos
    taskInput.on('keypress', function (e) {
        if (e.key === 'Enter' && taskInput.val().trim()) {
            addTask(taskInput.val().trim());
            taskInput.val('');
        }
    });

    taskList.on('click', '.task-priority', function () {
        const index = $(this).data('index');
        changePriority(index);
    });

    taskList.on('change', '.task-complete', function () {
        const index = $(this).data('index');
        toggleComplete(index);
    });

    taskList.on('click', '.task-delete', function () {
        const index = $(this).data('index');
        deleteTask(index);
    });

    clearCompleted.on('click', function () {
        clearCompletedTasks();
    });

    loadTasks();
});