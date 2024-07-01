document.addEventListener('DOMContentLoaded', function() {
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
            const taskCard = createTaskCard(title, description, randomColor);
            
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

        const colorSelector = createColorSelector(taskCard);
        taskCard.appendChild(colorSelector);

        return taskCard;
    }

    function createColorSelector(taskCard) {
        const colorOptions = document.createElement('div');
        colorOptions.className = 'color-options';

        colors.forEach(color => {
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

    window.editTask = function(editButton) {
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
    };

    window.markTaskDone = function(doneButton) {
        const taskCard = doneButton.parentNode.parentNode;
        taskCard.classList.toggle('done');
    };

    window.confirmDeleteTask = function(deleteButton) {
        if (confirm('¿Desea eliminar esta tarea?')) {
            const taskCard = deleteButton.parentNode.parentNode;
            taskCard.remove();
        }
    };

    window.changeCursor = function(element) {
        element.style.cursor = 'pointer';
    };
});

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

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('toggleThemeSwitch');
    const languageSelect = document.getElementById('languageSelect');

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme', themeSwitch.checked);
        localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
    });

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        changeLanguage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeSwitch.checked = true;
    }

    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);
    }

    function changeLanguage(language) {
        const elements = document.querySelectorAll('[data-text-es], [data-text-en]');
        elements.forEach(element => {
            const textKey = element.getAttribute(`data-text-${language}`);
            if (textKey) {
                element.textContent = textKey;
            }
        });
    }
});
