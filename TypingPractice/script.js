const paragraphs = ["Lorem ipsum dolor sit amet consectetur adipisicing "];

const setUpSection = document.querySelector(".setup-section");
const currentTimeDuration = document.querySelector(".current-duration");
const timeDurationList = document.querySelector(".duration-options");
const currentTextDifficulty = document.querySelector(".current-difficulty");
const textDifficultyOptions = document.querySelector(".difficulty-options");
const startTestButton = document.querySelector(".start-test");
const testBoard = document.querySelector(".test-board-active");
const timeLeft = document.querySelector(".time-left");
const closeTestButton = document.querySelector(".close-test");
const testResultSection = document.querySelector(".results");

const PARAGRAPH_LINES = [];
const CHARACTERS_LENGTH_PER_LINE = 10;

function selectFromOptionGroup(currentOption, optionGroup) {
  const individualDurations = [...optionGroup.querySelectorAll("li")];

  individualDurations.forEach((duration) => {
    duration.addEventListener("click", () => {
      currentOption.innerHTML = duration.innerHTML;
      optionGroup.style.display = "none";
    });
  });
}

function openOptionsGroup(currentOption, optionGroup) {
  const hasSameClass =
    currentOption.className === currentTimeDuration.className;

  hasSameClass === true
    ? (textDifficultyOptions.style.display = "none")
    : (timeDurationList.style.display = "none");

  optionGroup.style.display = "flex";
}

function displayOptionGroup(currentOption, optionGroup) {
  currentOption.addEventListener("click", () => {
    openOptionsGroup(currentOption, optionGroup);
    selectFromOptionGroup(currentOption, optionGroup);
  });
}

displayOptionGroup(currentTimeDuration, timeDurationList);
displayOptionGroup(currentTextDifficulty, textDifficultyOptions);

function closeTestBoard() {
  testBoard.style.display = "none";
  testResultSection.style.display = "flex";
}

function displayResults() {
  // testBoard.style.display = "none";
  // testResultSection.style.display = "flex";
  // calculateResults()
}

function updateCharClass(char, index, actions) {
  const { addClass = [], removeClass = [] } = actions;
  addClass.forEach((cls) => char[index].classList.add(cls));
  removeClass.forEach((cls) => char[index].classList.remove(cls));
}

function countTotalWordsTyped(paragraphLines, currentLine, charIndex) {
  if (
    !paragraphLines.length ||
    currentLine < 0 ||
    currentLine >= paragraphLines.length
  ) {
    return 0;
  }
  let totalCompletedLines = paragraphLines.slice(0, currentLine + 1);
  totalCompletedLines.pop();

  const charactersTypedFromCurrentLine = paragraphLines[
    currentLine
  ].innerText.slice(0, charIndex);

  const totalCharactersTyped =
    totalCompletedLines.map((line) => `${line.innerText} `).join("") +
    charactersTypedFromCurrentLine;

  const totalWordsTyped = totalCharactersTyped.split(" ").length;
  console.log(totalWordsTyped);
  return totalWordsTyped;
}

function onceUserStartTyping(paragraph) {
  const paragraphLines = Array.from(paragraph.querySelectorAll("strong"));
  let currentLine = 0;
  let charIndex = 0;
  document.addEventListener("keydown", (e) => {
    const typedChar = e.key;
    if (typedChar === "Shift" || typedChar === "CapsLock") return;
    if (!paragraphLines[currentLine]) return;

    const paragraphText = paragraphLines[currentLine].innerText.trim();
    const paragraphCharacters = Array.from(
      paragraphLines[currentLine].querySelectorAll("span")
    );
    if (typedChar === "Backspace") {
      if (charIndex === 0 && currentLine === 0) {
        paragraphCharacters[charIndex].classList.add("current-char");
        return;
      }
      if (charIndex > 0) {
        charIndex--;
        updateCharClass(paragraphCharacters, charIndex, {
          removeClass: ["correct-typed-char", "wrong-typed-char"],
        });
        updateCharClass(paragraphCharacters, charIndex, {
          addClass: ["current-char"],
        });
        updateCharClass(paragraphCharacters, charIndex + 1, {
          removeClass: ["current-char"],
        });
      } else if (charIndex === 0) {
        updateCharClass(paragraphCharacters, charIndex, {
          removeClass: ["current-char"],
        });

        currentLine > 0 && currentLine--;
        charIndex = paragraphLines[currentLine].innerText.trim().length - 1;
        const previousLineCharacters = Array.from(
          paragraphLines[currentLine].querySelectorAll("span")
        );

        updateCharClass(previousLineCharacters, charIndex, {
          removeClass: ["correct-typed-char", "wrong-typed-char"],
        });
        updateCharClass(previousLineCharacters, charIndex, {
          addClass: ["current-char"],
        });
        return;
      }
    } else if (typedChar === paragraphText[charIndex]) {
      if (charIndex === paragraphText.length - 1) {
        updateCharClass(paragraphCharacters, charIndex, {
          addClass: ["correct-typed-char"],
        });

        //TODO: go to results section
        if (currentLine === paragraphLines.length - 1) {
          displayResults();
          return;
        }
        currentLine++;
        charIndex = 0;

        paragraphLines[currentLine] &&
          updateCharClass(
            paragraphLines[currentLine].getElementsByTagName("span"),
            charIndex,
            {
              addClass: ["current-char"],
            }
          );
      } else {
        updateCharClass(paragraphCharacters, charIndex + 1, {
          addClass: ["current-char"],
        });
        updateCharClass(paragraphCharacters, charIndex, {
          addClass: ["correct-typed-char"],
        });
        charIndex++;
      }
    } else if (typedChar !== paragraphText[charIndex]) {
      if (charIndex === paragraphText.length - 1) {
        updateCharClass(paragraphCharacters, charIndex, {
          addClass: ["wrong-typed-char"],
        });
        //TODO: go to results section
        if (currentLine === paragraphLines.length - 1) {
          displayResults();
          return;
        }

        currentLine++;
        charIndex = 0;

        paragraphLines[currentLine] &&
          updateCharClass(
            paragraphLines[currentLine].getElementsByTagName("span"),
            charIndex,
            {
              addClass: ["current-char"],
            }
          );
      } else {
        updateCharClass(paragraphCharacters, charIndex + 1, {
          addClass: ["current-char"],
        });
        updateCharClass(paragraphCharacters, charIndex, {
          addClass: ["wrong-typed-char"],
        });
        charIndex++;
      }
    }
    countTotalWordsTyped(paragraphLines, currentLine, charIndex);
  });
}

function getParagraphInnerHTML(paragraph) {
  let CHARACTERS_LENGTH = CHARACTERS_LENGTH_PER_LINE;
  paragraph = paragraph
    .split("")
    .map((char, i) => {
      if (i === 0) {
        return `<strong><span class="current-char">${char}</span>`;
      } else if (i === CHARACTERS_LENGTH) {
        return `<span>${char}</span></strong>`;
      } else if (i === CHARACTERS_LENGTH + 1) {
        CHARACTERS_LENGTH += CHARACTERS_LENGTH_PER_LINE;
        return char === " "
          ? `<strong>${char}`
          : `<strong><span>${char}</span>`;
      } else if (i === paragraph.length - 1) {
        return `<span>${char}</span></strong>`;
      } else {
        return `<span>${char}</span>`;
      }
    })
    .join("");

  return paragraph;
}

function generateParagraphHTMLElement() {
  const paraElement = document.createElement("p");
  paraElement.classList.add("text-to-type");
  paraElement.innerHTML = getParagraphInnerHTML(paragraphs[0]);
  return paraElement;
}

function startTest() {
  setUpSection.style.display = "none";
  testBoard.style.display = "flex";

  const paragraph = generateParagraphHTMLElement();
  testBoard.appendChild(paragraph);

  closeTestButton.addEventListener("click", () => closeTestBoard());

  onceUserStartTyping(paragraph);
}

startTest();

// startTestButton.addEventListener("click", () => {
//   startTest();
// });
