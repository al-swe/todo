const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const taskNumber = document.getElementById("taskNumber");

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskName = taskInput.value.trim();

  if (!taskName) {
    alert("Please enter a valid task name!");
  } else {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ id: Date.now(), name: taskName });
    saveTasksToLocalStorage(tasks);
    taskInput.value = "";
    getTasks();
  }
}

function removeTask(id) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage(updatedTasks);
  getTasks();
}

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
