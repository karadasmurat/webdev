function dragstartHandler(e) {
  console.log("Drag start:", e.target.id);
  // Add the target element's id to the data transfer object
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
  console.log("handle dragover");

  ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
  ev.preventDefault();
  console.log("handle drop");
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text/plain");
  ev.target.appendChild(document.getElementById(data));
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const draggable1 = document.getElementById("draggable1");
  // Add the ondragstart event listener
  draggable1.addEventListener("dragstart", dragstartHandler);
});
