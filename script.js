// 1. Live Clock Function
function updateClock() {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 2. Load existing tasks and completion states from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskObj => {
    renderTaskElement(taskObj.text, taskObj.completed);
  });
}

// 3. Add a new task
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  
  if (taskText === "") return;

  renderTaskElement(taskText, false);
  saveTasksToLocalStorage();
  input.value = "";
}

// 4. Render a task onto the page screen
function renderTaskElement(text, isCompleted) {
  const ul = document.getElementById('taskList');
  const li = document.createElement('li');
  
  if (isCompleted) {
    li.classList.add('completed');
  }

  li.innerHTML = `<span>${text}</span> <button onclick="removeTask(event, this)">X</button>`;
  
  // Click on the task text to toggle completed state
  li.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
      li.classList.toggle('completed');
      saveTasksToLocalStorage();
    }
  });

  ul.appendChild(li);
}

// 5. Remove an individual task
function removeTask(event, button) {
  event.stopPropagation(); // Prevent triggering the li click event
  button.parentElement.remove();
  saveTasksToLocalStorage();
}

// 6. Clear all tasks
function clearAllTasks() {
  document.getElementById('taskList').innerHTML = "";
  localStorage.removeItem('tasks');
}

// 7. Save current task list array and states to browser storage
function saveTasksToLocalStorage() {
  const ul = document.getElementById('taskList');
  const tasks = [];
  ul.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Allow pressing "Enter" to add a task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});