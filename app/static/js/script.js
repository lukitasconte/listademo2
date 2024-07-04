document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('taskForm');
    const buttonElement = document.getElementById('toggleFormButton');
    const historyElement = document.getElementById('taskHistory');
    const taskContainer = document.getElementById('taskContainer');
    const colors = ['red', 'blue', 'yellow', 'purple', 'green'];

    const taskManager = new TaskManager(taskContainer, colors);
    const formManager = new FormManager(formElement, buttonElement, historyElement, taskManager);
    const clockManager = new ClockManager(document.getElementById('time'), document.getElementById('date'));
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager();

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
    constructor(taskContainer, colors) {
        this.taskContainer = taskContainer;
        this.colors = colors;
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

        formManager.toggleForm();

        document.getElementById('taskTitle').value = titleElement.textContent;
        document.getElementById('taskDescription').value = descriptionElement.textContent;

        taskCard.classList.add('editing');
        formManager.form.dataset.mode = 'edit';
        formManager.form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    }

    markTaskDone(doneButton) {
        const taskCard = doneButton.parentNode.parentNode;
        taskCard.classList.toggle('done');
    }

    confirmDeleteTask(deleteButton) {
        if (confirm('¿Desea eliminar esta tarea?')) {
            const taskCard = deleteButton.parentNode.parentNode;
            taskCard.remove();

            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(task => task.title !== taskCard.querySelector('h4').textContent);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    }
}

class FormManager {
    constructor(formElement, buttonElement, historyElement, taskManager) {
        this.form = formElement;
        this.button = buttonElement;
        this.history = historyElement;
        this.taskManager = taskManager;

        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.toggleForm());
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    toggleForm() {
        if (this.form.style.display === 'none') {
            this.form.style.display = 'block';
            this.history.style.display = 'none';
            this.button.innerHTML = '⌃';
        } else {
            this.form.style.display = 'none';
            this.history.style.display = 'block';
            this.button.innerHTML = '+';
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        if (this.form.dataset.mode === 'edit') {
            const taskCard = document.querySelector('.task-card.editing');
            const titleElement = taskCard.querySelector('h4');
            const descriptionElement = taskCard.querySelector('p');

            titleElement.textContent = title;
            descriptionElement.textContent = description;

            this.form.dataset.mode = 'add';
            this.form.querySelector('button[type="submit"]').textContent = 'Guardar Tarea';

            taskCard.classList.remove('editing');
            this.form.reset();
        } else {
            const randomColor = this.taskManager.colors[Math.floor(Math.random() * this.taskManager.colors.length)];
            const taskCard = this.taskManager.createTaskCard(title, description, randomColor);

            this.taskManager.taskContainer.appendChild(taskCard);
            this.taskManager.saveTask(title, description, randomColor);
            this.form.reset();
        }

        this.form.style.display = 'none';
        this.history.style.display = 'block';
        this.button.innerHTML = '+';
    }
}

class ClockManager {
    constructor(timeElement, dateElement) {
        this.timeElement = timeElement;
        this.dateElement = dateElement;

        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        this.timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString(undefined, options);
        this.dateElement.textContent = dateString;
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
