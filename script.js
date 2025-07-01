let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addBtn.click();
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Initial load
renderTasks();
