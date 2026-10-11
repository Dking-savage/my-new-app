// 1. Live Clock Function
function updateClock() {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 2. To-Do List Functionality
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  
  if (taskText === "") return;

  const ul = document.getElementById('taskList');
  const li = document.createElement('li');
  
  li.innerHTML = `<span>${taskText}</span> <button onclick="this.parentElement.remove()">X</button>`;
  
  ul.appendChild(li);
  input.value = "";
}

// Allow pressing "Enter" to add a task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});
