document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('toggleFormButton');
    const form = document.getElementById('taskForm');
    const history = document.getElementById('taskHistory');
    const taskContainer = document.getElementById('taskContainer');
    const colors = ['red', 'blue', 'yellow', 'purple', 'green'];

    button.addEventListener('click', function() {
        if (form.style.display === 'none') {
            // Mostrar el formulario y ocultar el historial de tareas
            form.style.display = 'block';
            history.style.display = 'none';
            button.innerHTML = '⌃'; // Cambiar a flecha hacia arriba
        } else {
            // Ocultar el formulario y mostrar el historial de tareas
            form.style.display = 'none';
            history.style.display = 'block';
            button.innerHTML = '+'; // Cambiar a símbolo de más
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        if (form.dataset.mode === 'edit') {
            // Modo edición: actualizar la tarea existente
            const taskCard = document.querySelector('.task-card.editing');
            const titleElement = taskCard.querySelector('h4');
            const descriptionElement = taskCard.querySelector('p');

            // Actualizar los elementos de tarea con los nuevos valores
            titleElement.textContent = title;
            descriptionElement.textContent = description;

            // Cambiar el modo del formulario de vuelta a 'add'
            form.dataset.mode = 'add';
            form.querySelector('button[type="submit"]').textContent = 'Guardar Tarea';

            // Mostrar la tarea actualizada y limpiar el formulario
            taskCard.classList.remove('editing');
            form.reset();
        } else {
            // Modo agregar nueva tarea
            // Elegir un color aleatorio de la lista de colores
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            // Crear un nuevo elemento de tarea con el color elegido
            const taskCard = createTaskCard(title, description, randomColor);
            
            taskContainer.appendChild(taskCard);

            // Limpiar el formulario
            form.reset();
        }

        // Ocultar el formulario y mostrar el historial de tareas
        form.style.display = 'none';
        history.style.display = 'block';
        button.innerHTML = '+'; // Cambiar a símbolo de más
    });

    // Añadir funcionalidad para el botón Enter
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && form.style.display === 'block') {
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Función para crear el elemento de tarea
    function createTaskCard(title, description, color) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${color}`;
        taskCard.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <div class="task-actions">
                <div class="edit-task" onclick="editTask(this)" onmouseover="changeCursor(this)">
                    ✏️
                </div>
                <div class="mark-done" onclick="markTaskDone(this)" onmouseover="changeCursor(this)">
                    ✔️
                </div>
                <div class="delete-task" onclick="confirmDeleteTask(this)" onmouseover="changeCursor(this)">
                    ❌
                </div>
            </div>
        `;

        // Botón para cambiar el color de fondo
        const colorSelector = createColorSelector(taskCard);
        taskCard.appendChild(colorSelector);

        return taskCard;
    }

    // Función para crear el selector de color
    function createColorSelector(taskCard) {
        const colorOptions = document.createElement('div');
        colorOptions.className = 'color-options';

        colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${color}`;
            colorOption.addEventListener('click', function(event) {
                event.stopPropagation(); // Evitar que el click se propague al formulario

                taskCard.className = `task-card ${color}`;
            });
            colorOptions.appendChild(colorOption);
        });

        return colorOptions;
    }

    // Función para editar la tarea
    window.editTask = function(editButton) {
        const taskCard = editButton.parentNode.parentNode;
        const titleElement = taskCard.querySelector('h4');
        const descriptionElement = taskCard.querySelector('p');
        
        // Mostrar el formulario de edición con los valores actuales
        form.style.display = 'block';
        history.style.display = 'none';
        button.innerHTML = '⌃'; // Cambiar a flecha hacia arriba

        // Prellenar el formulario con los valores actuales de la tarea
        document.getElementById('taskTitle').value = titleElement.textContent;
        document.getElementById('taskDescription').value = descriptionElement.textContent;

        // Marcar la tarea como editándose
        taskCard.classList.add('editing');

        // Cambiar el modo del formulario a 'edit'
        form.dataset.mode = 'edit';
        form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    };

    // Función para marcar una tarea como hecha
    window.markTaskDone = function(doneButton) {
        const taskCard = doneButton.parentNode.parentNode;
        taskCard.classList.toggle('done');
    };

    // Función para confirmar la eliminación de una tarea
    window.confirmDeleteTask = function(deleteButton) {
        if (confirm('¿Desea eliminar esta tarea?')) {
            const taskCard = deleteButton.parentNode.parentNode;
            taskCard.remove();
        }
    };

    // Función para cambiar el cursor al pasar sobre el icono de editar
    window.changeCursor = function(element) {
        element.style.cursor = 'pointer';
    };
});

