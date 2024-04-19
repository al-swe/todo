const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const taskNumber = document.getElementById("taskNumber");

// Get tasks from localstorage or create empty array
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks to local storage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task to list
function addTask() {
  const taskName = taskInput.value.trim();

  if (!taskName) {
    taskInput.classList.add("invalid");
    setTimeout(() => {
        taskInput.classList.remove("invalid");
    }, 1000);
  } else {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ id: Date.now(), name: taskName });
    saveTasksToLocalStorage(tasks);
    taskInput.value = "";
    getTasks();

    const newTaskItem = taskList.lastElementChild;
    newTaskItem.classList.add("grow");
  }
}

// Remove a task from list by id
function removeTask(id) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage(updatedTasks);
  getTasks();
}

// Retrieve tasks from localstorage and populate DOM
function getTasks() {
  taskList.innerHTML = "";

  const tasks = getTasksFromLocalStorage();

  if (tasks.length === 0) {
    const message = document.createElement("p");
    message.textContent = "All tasks completed!";
    taskList.appendChild(message);
  } else {
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = task.name;

      const deleteButton = document.createElement("button");
      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-xmark");
      deleteButton.appendChild(icon);
      deleteButton.addEventListener("click", () => {
        removeTask(task.id);
      });

      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }

  taskNumber.innerText = tasks.length;
}

function clearList() {
  localStorage.removeItem("tasks");
  getTasks();
}

addBtn.addEventListener("click", () => {
  addTask();
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

clearBtn.addEventListener("click", () => {
  clearList();
  getTasks();
});

getTasks();
