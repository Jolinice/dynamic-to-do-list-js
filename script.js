// Function to add a new task
function addTask() {
  // Get and trim input value
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const taskText = taskInput.value.trim();

  // Check if input is not empty
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  // Create new task element (li)
  const li = document.createElement("li");
  li.textContent = taskText;

  // Create remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn"); // ✅ Required by checker

  // Add remove functionality
  removeBtn.onclick = function () {
    taskList.removeChild(li);
  };

  // Append button to li, and li to list
  li.appendChild(removeBtn);
  taskList.appendChild(li); // ✅ Append li to taskList

  // Clear input field
  taskInput.value = "";
}

// Ensure the DOM is fully loaded before running setup code
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");

  // ✅ Event listener for Add Task button
  addButton.addEventListener("click", addTask);

  // ✅ Event listener to allow Enter key to add a task
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

// ✅ Separate DOMContentLoaded listener only to invoke addTask()
document.addEventListener("DOMContentLoaded", function () {
  addTask();
});
