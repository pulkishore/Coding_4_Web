document.addEventListener("DOMContentLoaded", function () {
  let counter = localStorage.getItem("viewCounter") || 0;
  counter = parseInt(counter, 10) + 1;
  localStorage.setItem("viewCounter", counter);

  document.getElementById("counter").textContent = counter;
});
