// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the button element
  var goToTopButton = document.getElementById("goToTopBtn");

  // Add a click event listener to the button
  goToTopButton.addEventListener("click", function () {
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function () {
  var goToTopBtn = document.getElementById("goToTopBtn");

  // Show the button when the user scrolls down 200 pixels from the top
  if (window.scrollY > 4000) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
});
