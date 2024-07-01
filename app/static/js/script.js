document.addEventListener('DOMContentLoaded', function() {
    const taskManager = new TaskManager();
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager();

    const button = document.getElementById('toggleFormButton');
    const form = document.getElementById('taskForm');
    const history = document.getElementById('taskHistory');
    const taskContainer = document.getElementById('taskContainer');
    const colors = ['red', 'blue', 'yellow', 'purple', 'green'];

    button.addEventListener('click', function() {
        if (form.style.display === 'none') {
            form.style.display = 'block';
            history.style.display = 'none';
            button.innerHTML = '⌃';
        } else {
            form.style.display = 'none';
            history.style.display = 'block';
            button.innerHTML = '+';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        if (form.dataset.mode === 'edit') {
            const taskCard = document.querySelector('.task-card.editing');
            const titleElement = taskCard.querySelector('h4');
            const descriptionElement = taskCard.querySelector('p');

            titleElement.textContent = title;
            descriptionElement.textContent = description;

            form.dataset.mode = 'add';
            form.querySelector('button[type="submit"]').textContent = 'Guardar Tarea';

            taskCard.classList.remove('editing');
            form.reset();
        } else {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const taskCard = taskManager.createTaskCard(title, description, randomColor);
            
            taskContainer.appendChild(taskCard);
            form.reset();
        }

        form.style.display = 'none';
        history.style.display = 'block';
        button.innerHTML = '+';
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && form.style.display === 'block') {
            form.dispatchEvent(new Event('submit'));
        }
    });

    taskManager.loadTasks();

    window.editTask = function(editButton) {
        taskManager.editTask(editButton);
    };

    window.markTaskDone = function(doneButton) {
        taskManager.markTaskDone(doneButton);
    };

    window.confirmDeleteTask = function(deleteButton) {
        taskManager.confirmDeleteTask(deleteButton);
    };

    window.changeCursor = function(element) {
        element.style.cursor = 'pointer';
    };
});

class TaskManager {
    constructor() {
        this.colors = ['red', 'blue', 'yellow', 'purple', 'green'];
        this.taskContainer = document.getElementById('taskContainer');
    }

    createTaskCard(title, description, color) {
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

        const colorSelector = this.createColorSelector(taskCard);
        taskCard.appendChild(colorSelector);

        return taskCard;
    }

    createColorSelector(taskCard) {
        const colorOptions = document.createElement('div');
        colorOptions.className = 'color-options';

        this.colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${color}`;
            colorOption.addEventListener('click', function(event) {
                event.stopPropagation();
                taskCard.className = `task-card ${color}`;
            });
            colorOptions.appendChild(colorOption);
        });

        return colorOptions;
    }

    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskCard = this.createTaskCard(task.title, task.description, task.color);
            this.taskContainer.appendChild(taskCard);
        });
    }

    saveTask(title, description, color) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ title, description, color });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    editTask(editButton) {
        const taskCard = editButton.parentNode.parentNode;
        const titleElement = taskCard.querySelector('h4');
        const descriptionElement = taskCard.querySelector('p');
        
        form.style.display = 'block';
        history.style.display = 'none';
        button.innerHTML = '⌃';

        document.getElementById('taskTitle').value = titleElement.textContent;
        document.getElementById('taskDescription').value = descriptionElement.textContent;

        taskCard.classList.add('editing');
        form.dataset.mode = 'edit';
        form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    }

    markTaskDone(doneButton) {
        const taskCard = doneButton.parentNode.parentNode;
        taskCard.classList.toggle('done');
    }

    confirmDeleteTask(deleteButton) {
        if (confirm('¿Desea eliminar esta tarea?')) {
            const taskCard = deleteButton.parentNode.parentNode;
            taskCard.remove();
        }
    }
}

class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        const themeSwitch = document.getElementById('toggleThemeSwitch');
        themeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme', themeSwitch.checked);
            localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitch.checked = true;
        }
    }
}

class LanguageManager {
    constructor() {
        this.init();
    }

    init() {
        const languageSelect = document.getElementById('languageSelect');
        languageSelect.addEventListener('change', () => {
            const selectedLanguage = languageSelect.value;
            this.changeLanguage(selectedLanguage);
            localStorage.setItem('selectedLanguage', selectedLanguage);
        });

        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            this.changeLanguage(savedLanguage);
        }
    }

    changeLanguage(language) {
        const elements = document.querySelectorAll('[data-text-es], [data-text-en]');
        elements.forEach(element => {
            const textKey = element.getAttribute(`data-text-${language}`);
            if (textKey) {
                element.textContent = textKey;
            }
        });
    }
}

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('time').textContent = timeString;

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var dateString = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock();
