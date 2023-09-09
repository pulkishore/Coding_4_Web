// Add this JavaScript code to your existing script.js or create a new script section
document.addEventListener("DOMContentLoaded", (event) => {
  const fadeOutScreen = document.getElementById("fade-out-screen");
  const mainContent = document.getElementById("main-content");

  // Function to fade out the loading screen and reveal the main content
  function fadeOutAndReveal() {
    fadeOutScreen.style.opacity = "0";
    setTimeout(() => {
      fadeOutScreen.style.display = "none";
      mainContent.style.display = "block";
    }, 2000);
  }

  // Call the fadeOutAndReveal function after a delay of 3 seconds (3000 milliseconds)
  setTimeout(fadeOutAndReveal, 3000);
});
