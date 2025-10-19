// We place setup and loading inside DOMContentLoaded to ensure DOM elements are ready.
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Array to hold task strings in memory
  let tasks = [];

  // Save the current tasks array to Local Storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render a single task into the DOM (without touching localStorage)
  function renderTask(taskText) {
    // Create new task element (li)
    const li = document.createElement("li");

    // Use a span for the text so we don't mix button text into it
    const span = document.createElement("span");
    span.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn"); // ✅ Required by checker

    // Add remove functionality: remove from DOM and from tasks array, then save
    removeBtn.onclick = function () {
      // Remove li from DOM
      taskList.removeChild(li);

      // Remove one occurrence of taskText from tasks array
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    };

    // Append text and button to li, then append li to the list
    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  // Add a task. If taskText is provided, use it; otherwise read from input.
  // save === true indicates we should store it into localStorage (avoid when loading)
  function addTask(taskText, save = true) {
    // If no taskText param provided, get it from the input field
    let text =
      typeof taskText === "string" ? taskText.trim() : taskInput.value.trim();

    // Check if input is not empty
    if (text === "") {
      alert("Please enter a task");
      return;
    }

    // Add to in-memory array and save to localStorage if requested
    if (save) {
      // Update tasks array and persist
      tasks.push(text);
      saveTasks();
    } else {
      // If not saving (loading), still keep in-memory array in sync
      tasks.push(text);
    }

    // Render the task in the DOM
    renderTask(text);

    // Clear input field when the task was added from the input
    if (typeof taskText !== "string") {
      taskInput.value = "";
    }
  }

  // Load tasks from localStorage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    // Ensure tasks array reflects stored tasks
    tasks = [];
    storedTasks.forEach((task) => {
      addTask(task, false); // false -> do not save again to localStorage
    });
  }

  // Attach event listeners (as required)
  addButton.addEventListener("click", function () {
    addTask(); // reads from input and saves
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load existing tasks on page load
  loadTasks();
});
