let currentFilter = 'all';

// 1. Live Clock Function
function updateClock() {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 2. Load existing tasks, states, and timestamps from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskObj => {
    renderTaskElement(taskObj.text, taskObj.completed, taskObj.time);
  });
  updateCounter();
  applyFilter();
}

// 3. Add a new task with a timestamp
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  
  if (taskText === "") return;

  const now = new Date();
  const timeText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  renderTaskElement(taskText, false, timeText);
  saveTasksToLocalStorage();
  updateCounter();
  applyFilter();
  input.value = "";
}

// 4. Render a task onto the page screen
function renderTaskElement(text, isCompleted, timeText) {
  const ul = document.getElementById('taskList');
  const li = document.createElement('li');
  
  if (isCompleted) {
    li.classList.add('completed');
  }

  li.innerHTML = `
    <div class="task-content">
      <span>${text}</span>
      <span class="task-time">${timeText}</span>
    </div>
    <button onclick="removeTask(event, this)">X</button>
  `;
  
  li.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
      li.classList.toggle('completed');
      saveTasksToLocalStorage();
      updateCounter();
      applyFilter();
    }
  });

  ul.appendChild(li);
}

// 5. Remove an individual task
function removeTask(event, button) {
  event.stopPropagation();
  button.parentElement.parentElement.remove();
  saveTasksToLocalStorage();
  updateCounter();
  applyFilter();
}

// 6. Clear all tasks
function clearAllTasks() {
  document.getElementById('taskList').innerHTML = "";
  localStorage.removeItem('tasks');
  updateCounter();
}

// 7. Set active filter and re-apply
function setFilter(filterType, buttonElement) {
  currentFilter = filterType;

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  buttonElement.classList.add('active');

  applyFilter();
}

// 8. Show/hide tasks based on the current filter selection
function applyFilter() {
  const items = document.querySelectorAll('#taskList li');
  items.forEach(li => {
    const isCompleted = li.classList.contains('completed');
    if (currentFilter === 'all') {
      li.style.display = 'flex';
    } else if (currentFilter === 'active' && !isCompleted) {
      li.style.display = 'flex';
    } else if (currentFilter === 'completed' && isCompleted) {
      li.style.display = 'flex';
    } else {
      li.style.display = 'none';
    }
  });
}

// 9. Update the task counter display text
function updateCounter() {
  const ul = document.getElementById('taskList');
  const total = ul.querySelectorAll('li').length;
  const completed = ul.querySelectorAll('li.completed').length;
  const remaining = total - completed;

  const counterEl = document.getElementById('taskCounter');
  if (total === 0) {
    counterEl.innerText = "No tasks yet";
  } else {
    counterEl.innerText = `${remaining} remaining (${completed} completed)`;
  }
}

// 10. Save current task list array, states, and timestamps to browser storage
function saveTasksToLocalStorage() {
  const ul = document.getElementById('taskList');
  const tasks = [];
  ul.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-content span').innerText,
      time: li.querySelector('.task-time').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Allow pressing "Enter" to add a task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});
