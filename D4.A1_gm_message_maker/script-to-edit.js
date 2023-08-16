function chooseImage() {
  let picture = document.getElementById("choice").value;
  document.getElementById("imagebox").src = picture;
}

function topText() {
  let ptext1 = document.getElementById("primaryText").value;
  document.getElementById("text-1").innerHTML = ptext1;
}

function bottomText() {
  let ptext2 = document.getElementById("secondaryText").value;
  document.getElementById("text-2").innerHTML = ptext2;
}

function fontChange() {
  let chosenFont = document.querySelector(
    'input[name="fontfamily"]:checked'
  ).value;

  let textElements = document.querySelectorAll(".text");
  textElements.forEach(function (element) {
    element.style.fontFamily = chosenFont;
  });
}

function chooseColor() {
  let tcolor = document.getElementById("textColor").value;
  let changedColor1 = document.getElementById("text-1");
  let changedColor2 = document.getElementById("text-2");

  changedColor1.style.color = tcolor;
  changedColor2.style.color = tcolor;
}

function changeSize() {
  let sfont = document.getElementById("slider").value;
  let t1 = document.getElementById("text-1");
  let t2 = document.getElementById("text-2");

  t1.style.fontSize = sfont + "px";
  t2.style.fontSize = sfont + "px";
}

function changeWeight() {
  let wfont = document.getElementById("weight").value;
  let w1 = document.getElementById("text-1");
  let w2 = document.getElementById("text-2");

  w1.style.webkitTextStrokeWidth = wfont + "px";
  w2.style.webkitTextStrokeWidth = wfont + "px";
}

function chooseStroke() {
  let stroke = document.getElementById("textStroke").value;
  let changedStroke1 = document.getElementById("text-1");
  let changedStroke2 = document.getElementById("text-2");

  changedStroke1.style.webkitTextStrokeColor = stroke;
  changedStroke2.style.webkitTextStrokeColor = stroke;
}

const slider = document.getElementById("slider");
const needle = document.querySelector(".needle");

slider.addEventListener("input", () => {
  const value = slider.value;
  const rotation = (value / 100) * 270 - 45; // Adjust the range for the desired rotation
  needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
});

// script.js
const styleToggleBtn = document.getElementById("styleToggle");
const stylesheetLink = document.getElementById("mainStylesheet");
let retroStylesEnabled = false;

styleToggleBtn.addEventListener("click", () => {
  if (retroStylesEnabled) {
    stylesheetLink.href = "style-to-edit.css";
  } else {
    stylesheetLink.href = "retro-styles.css";
  }
  retroStylesEnabled = !retroStylesEnabled;
});

// Your JavaScript goes here
