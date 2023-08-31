function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function smoothScroll(target) {
  const targetElement = document.querySelector(target);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  generatemovIndex();
  generatemov();

  // Add click event listeners to anchor links in the left sidebar
  document.querySelectorAll(".list a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      smoothScroll(targetId);
    });
  });

  // Add click event listeners to anchor links in the product info cards
  document.querySelectorAll(".info h3 a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      smoothScroll(targetId);
    });
  });
});
