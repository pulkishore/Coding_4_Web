// Get references to the button and the div
const toggleButton = document.getElementById("button");
const boxDiv = document.getElementById("box");

// Add click event listener to the button
toggleButton.addEventListener("click", function () {
  // Toggle the display property of the div
  if (boxDiv.style.display === "none") {
    boxDiv.style.display = "block";
  } else {
    boxDiv.style.display = "none";
  }
});
