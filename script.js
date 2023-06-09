// Get the draggable items
const draggableItems = document.querySelectorAll(".draggable-item");

// Get the drop container
const dropContainer = document.getElementById("drop-container");

// Add event listeners for drag events
draggableItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

dropContainer.addEventListener("dragenter", dragEnter);
dropContainer.addEventListener("dragover", dragOver);
dropContainer.addEventListener("dragleave", dragLeave);
dropContainer.addEventListener("drop", drop);

// Add event listener for the reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reset);

// Store the dragged item
let draggedItem = null;

// Drag start event handler
function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
}

// Drag enter event handler
function dragEnter(event) {
  event.preventDefault();
  event.target.classList.add("drag-over");
}

// Drag over event handler
function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// Drag leave event handler
function dragLeave(event) {
  event.target.classList.remove("drag-over");
}

// Drop event handler
function drop(event) {
  event.preventDefault();
  event.target.classList.remove("drag-over");
  event.target.innerHTML = event.dataTransfer.getData("text/html");
  draggedItem.parentNode.removeChild(draggedItem);
  draggedItem = null;
  showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
  const successMessage = document.createElement("p");
  successMessage.textContent = "Item dropped successfully!";
  dropContainer.appendChild(successMessage);
}

// Reset the containers to their original state
function reset() {
  dropContainer.innerHTML = ""; // Clear the drop container

  // Append the draggable items back to the drag container
  draggableItems.forEach((item) => {
    document.getElementById("drag-container").appendChild(item);
  });

  draggedItem = null;
}
