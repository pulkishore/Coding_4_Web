function changeColor() {
  let xyz = document.getElementById("palette");
  if (xyz.style.backgroundColor === "cyan") {
    xyz.style.backgroundColor = "pink";
  } else {
    xyz.style.backgroundColor = "cyan";
  }
}
