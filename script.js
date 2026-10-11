// 1. Live Clock Function
function updateClock() {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 2. Load existing tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    renderTaskElement(taskText);
  });
}

// 3. Add a new task
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  
  if (taskText === "") return;

  renderTaskElement(taskText);
  saveTasksToLocalStorage();
  input.value = "";
}

// 4. Render a task onto the page screen
function renderTaskElement(text) {
  const ul = document.getElementById('taskList');
  const li = document.createElement('li');
  
  li.innerHTML = `<span>${text}</span> <button onclick="removeTask(this)">X</button>`;
  ul.appendChild(li);
}

// 5. Remove a task and update storage
function removeTask(button) {
  button.parentElement.remove();
  saveTasksToLocalStorage();
}

// 6. Save current task list array to browser storage
function saveTasksToLocalStorage() {
  const ul = document.getElementById('taskList');
  const tasks = [];
  ul.querySelectorAll('li span').forEach(span => {
    tasks.push(span.innerText);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Allow pressing "Enter" to add a task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});