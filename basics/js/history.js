// Event listeners
const pushButton = document.getElementById("pushHistory");
pushButton.addEventListener("click", pushHistory);

// Function to push a new state
function pushHistory() {
  for (let i = 0; i < 10; i++) {
    const newState = { page: `Page ${i}` };
    const newURL = `/${i}`;

    // Push a new state and change the URL
    history.pushState(newState, "", newURL);
  }
}
