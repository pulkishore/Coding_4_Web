document.addEventListener("DOMContentLoaded", () => {
  const loaderIframe = document.getElementById("loader-iframe");

  // Remove the loader after 2 seconds
  setTimeout(() => {
    loaderIframe.style.display = "none";
  }, 12000);
});
