const main = document.querySelector("main");
const button = document.querySelector(".change-color-btn");
const span = document.querySelector(".color-code");

const currentPage = window.location.pathname.replace("/ColorFlipper/", "");

// simple colors
const simpleColors = [
  "red",
  "blue",
  "green",
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
];

function generateHexadecimalNumber() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function randomSimpleColor() {
  return simpleColors[Math.round(Math.random() * (simpleColors.length - 1))];
}

button.addEventListener("click", () => {
  let newColor;
  if (currentPage === "index.html") {
    newColor = randomSimpleColor();
  } else if (currentPage === "hex.html") {
    newColor = generateHexadecimalNumber();
  }
  span.innerText = newColor;
  main.style.backgroundColor = newColor;
});
