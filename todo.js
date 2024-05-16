document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const priorityFilter = document.getElementById('priorityFilter');
    const dueDateFilter = document.getElementById('dueDateFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            if (task.completed) {
                li.classList.add('completed');
            }
            if ((priorityFilter.value === 'all' || task.priority === priorityFilter.value) &&
                (!dueDateFilter.value || task.dueDate === dueDateFilter.value) &&
                (categoryFilter.value === 'all' || task.category === categoryFilter.value)) {
                li.innerHTML = `
                    <span>${task.text}</span>
                    <span class="due-date">${task.dueDate}</span>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                `;
                taskList.appendChild(li);
            }
        });
    }

    addTaskBtn.addEventListener('click', function () {
        const text = taskInput.value.trim();
        const dueDate = dueDateFilter.value;
        const priority = priorityFilter.value;
        const category = categoryFilter.value;
        if (text !== '') {
            tasks.push({ text, completed: false, dueDate, priority, category });
            taskInput.value = '';
            renderTasks();
            updateLocalStorage();
        }
    });

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = parseInt(event.target.dataset.index);
            tasks.splice(index, 1);
            renderTasks();
            updateLocalStorage();
        }
        if (event.target.classList.contains('complete-btn')) {
            const index = parseInt(event.target.dataset.index);
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            updateLocalStorage();
        }
    });

    priorityFilter.addEventListener('change', renderTasks);
    dueDateFilter.addEventListener('change', renderTasks);
    categoryFilter.addEventListener('change', renderTasks);

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    renderTasks();
});
