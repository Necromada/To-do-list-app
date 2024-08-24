// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');

    // Check if the task already exists
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].firstChild.textContent === taskText) {
            alert('Task already exists!');
            return;
        }
    }

    // Create a new list item for the task
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Add a "completed" class when the task is clicked
    taskItem.addEventListener('click', function () {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save tasks after marking as completed
    });

    // Create a delete button for each task with an icon
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent triggering the task click event
        taskItem.remove();
        saveTasks(); // Save tasks after deletion
    });

    // Append the delete button to the task item
    taskItem.appendChild(deleteButton);

    // Add the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the input field after adding the task
    taskInput.value = '';

    saveTasks(); // Save tasks after adding a new task
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
            saveTasks(); // Save tasks after marking as completed
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent triggering the task click event
            taskItem.remove();
            saveTasks(); // Save tasks after deletion
        });

        taskItem.appendChild(deleteButton);
        document.getElementById('taskList').appendChild(taskItem);
    });
}
