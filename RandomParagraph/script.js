const quantityInput = document.getElementById("quantity");
const generateButton = document.querySelector(".generate");
const paragraphsContainer = document.querySelector(".paragraphs");

//constant for controlling paragraph generation
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const minParagraphSize = 300;
const maxParagraphSize = 450;

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateParagraph() {
  let paragraphText = "";
  let wordSpacing = getRandomNumberInRange(7, 11);
  let dotPlacement = getRandomNumberInRange(10, 15);
  let currentLetterCounter = 0;
  let currentWordCounter = 0;
  const targetParagraphLength = getRandomNumberInRange(
    minParagraphSize,
    maxParagraphSize
  );

  for (let i = 0; i < targetParagraphLength; i++) {
    currentLetterCounter++;

    const nextCharacter =
      i === targetParagraphLength - 1 || currentWordCounter === dotPlacement
        ? "."
        : currentLetterCounter === wordSpacing
        ? " "
        : paragraphText[i - 1] === "."
        ? alphabet[getRandomNumberInRange(0, alphabet.length - 1)].toUpperCase()
        : alphabet[
            getRandomNumberInRange(0, alphabet.length - 1)
          ].toLowerCase();

    paragraphText += nextCharacter;

    if (nextCharacter === ".") {
      currentWordCounter = 0;
      dotPlacement = getRandomNumberInRange(10, 15);
    } else if (nextCharacter === " ") {
      currentLetterCounter = 0;
      wordSpacing = getRandomNumberInRange(7, 11);
      currentWordCounter++;
    }
  }

  paragraphText = paragraphText
    .split(".")
    .map((word) => word.trim())
    .join(". ");
  console.log(paragraphText);

  return paragraphText;
}

function displayParagraphs() {
  const newParagraph = document.createElement("p");
  newParagraph.classList.add("paragraph");
  newParagraph.innerText = generateParagraph();
  paragraphsContainer.appendChild(newParagraph);
}

generateButton.addEventListener("click", () => {
  paragraphsContainer.innerHTML = "";
  const requestedQuantity = quantityInput.value;
  if (requestedQuantity <= 0) {
    paragraphsContainer.innerText = `Sorry!! ${requestedQuantity} is not a valid number`;
    return;
  }
  for (let i = 1; i <= requestedQuantity; i++) {
    displayParagraphs();
  }
});
