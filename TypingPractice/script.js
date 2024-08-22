const paragraphs = {
  easy: `Imagine you're on a sunny beach, feeling the warm sand between your toes. You've just finished reading an exciting book about adventures in space. Now, you're looking forward to trying out some new recipes you found online. One recipe caught your eye - a simple chocolate cake that promises to be deliciously moist and rich. As you gather your ingredients, you start thinking about how much fun it will be to bake something sweet for your family. This paragraph introduces a relaxing and familiar scenario, making it easier for beginners to focus on the task at hand without getting overwhelmed by complex vocabulary or grammar structures. Imagine you're on a sunny beach, feeling the warm sand between your toes. You've just finished reading an exciting book about adventures in space. Now, you're looking forward to trying out some new recipes you found online. One recipe caught your eye - a simple chocolate cake that promises to be deliciously moist and rich. As you gather your ingredients, you start thinking about how much fun it will be to bake something sweet for your family. This paragraph introduces a relaxing and familiar scenario, making it easier for beginners to focus on the task at hand without getting overwhelmed by complex vocabulary or grammar structures. Imagine you're on a sunny beach, feeling the warm sand between your toes. You've just finished reading an exciting book about adventures in space. Now, you're looking forward to trying out some new recipes you found online. One recipe caught your eye - a simple chocolate cake that promises to be deliciously moist and rich. As you gather your ingredients, you start thinking about how much fun it will be to bake something sweet for your family. This paragraph introduces a relaxing and familiar scenario, making it easier for beginners to focus on the task at hand without getting overwhelmed by complex vocabulary or grammar structures.`,

  medium: `In the heart of Silicon Valley, a small startup named InnovateTech has been working tirelessly on developing a revolutionary AI system capable of understanding and translating ancient languages. Their breakthrough could potentially unlock secrets hidden in historical texts, transforming our understanding of human history and culture. Meanwhile, across the globe, environmental scientists are racing against time to mitigate the effects of climate change. They are exploring innovative solutions such as carbon capture technology and reforestation projects to restore balance to our planet. This paragraph delves into more complex themes and ideas, requiring users to navigate through a mix of technical terms and abstract concepts, thus increasing the challenge level. In the heart of Silicon Valley, a small startup named InnovateTech has been working tirelessly on developing a revolutionary AI system capable of understanding and translating ancient languages. Their breakthrough could potentially unlock secrets hidden in historical texts, transforming our understanding of human history and culture. Meanwhile, across the globe, environmental scientists are racing against time to mitigate the effects of climate change. They are exploring innovative solutions such as carbon capture technology and reforestation projects to restore balance to our planet. This paragraph delves into more complex themes and ideas, requiring users to navigate through a mix of technical terms and abstract concepts, thus increasing the challenge level. In the heart of Silicon Valley, a small startup named InnovateTech has been working tirelessly on developing a revolutionary AI system capable of understanding and translating ancient languages. Their breakthrough could potentially unlock secrets hidden in historical texts, transforming our understanding of human history and culture. Meanwhile, across the globe, environmental scientists are racing against time to mitigate the effects of climate change. They are exploring innovative solutions such as carbon capture technology and reforestation projects to restore balance to our planet. This paragraph delves into more complex themes and ideas, requiring users to navigate through a mix of technical terms and abstract concepts, thus increasing the challenge level.`,
  hard: `As we stand on the brink of the 22nd century, humanity faces unprecedented challenges and opportunities. The rapid advancement of technology continues to reshape our world, leading to profound changes in how we communicate, work, and live. Simultaneously, the global community grapples with the consequences of climate change, economic inequality, and geopolitical tensions. Philosophers, scientists, and policymakers are engaged in intense debates over the ethical implications of artificial intelligence, genetic editing, and the future of work. Amidst this complex landscape, individuals and communities around the world are striving to build resilient societies that can adapt to an uncertain future." This final paragraph pushes the boundaries of complexity, covering a wide array of advanced topics and abstract concepts. It demands a high level of comprehension and vocabulary knowledge, making it suitable for experienced typists seeking a significant challenge. These paragraphs are designed to progressively increase in difficulty, providing a structured learning path for users of varying skill levels. Each paragraph is crafted to be engaging and thought-provoking, encouraging users to not only improve their typing speed but also to expand their vocabulary and critical thinking skills. As we stand on the brink of the 22nd century, humanity faces unprecedented challenges and opportunities. The rapid advancement of technology continues to reshape our world, leading to profound changes in how we communicate, work, and live. Simultaneously, the global community grapples with the consequences of climate change, economic inequality, and geopolitical tensions. Philosophers, scientists, and policymakers are engaged in intense debates over the ethical implications of artificial intelligence, genetic editing, and the future of work. Amidst this complex landscape, individuals and communities around the world are striving to build resilient societies that can adapt to an uncertain future." This final paragraph pushes the boundaries of complexity, covering a wide array of advanced topics and abstract concepts. It demands a high level of comprehension and vocabulary knowledge, making it suitable for experienced typists seeking a significant challenge. These paragraphs are designed to progressively increase in difficulty, providing a structured learning path for users of varying skill levels. Each paragraph is crafted to be engaging and thought-provoking, encouraging users to not only improve their typing speed but also to expand their vocabulary and critical thinking skills. `,
};

const setUpSection = document.querySelector(".setup-section");
const currentTimeDuration = document.querySelector(".current-duration");
const timeDurationList = document.querySelector(".duration-options");
const currentTextDifficulty = document.querySelector(".current-difficulty");
const textDifficultyOptions = document.querySelector(".difficulty-options");
const startTestButton = document.querySelector(".start-test");
const testBoard = document.querySelector(".test-board-active");
const selectedTimeDuration = document.querySelector(".selected-duration");
const closeTestButton = document.querySelector(".close-test");
const testResultSection = document.querySelector(".results");

const PARAGRAPH_LINES = [];
const windowSize = window.innerWidth;
const CHARACTERS_LENGTH_PER_LINE =
  windowSize < 678 ? (windowSize < 450 ? 15 : 22) : 41;
const TRANSLATE_Y = 6.5;
let isTimeDurationEnded = false;

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
  const resultHeader = testResultSection.querySelector("h3");
  const resultAnalysis = testResultSection.querySelector(".analysis");
  testBoard.style.display = "none";
  testResultSection.style.display = "flex";
  resultHeader.innerText = "You have canceled the test";
  resultAnalysis.style.display = "none";
}

function displayTypingResult(wpm) {
  const speed = document.querySelector(".results .speed");
  speed.innerHTML = `${wpm} <span>wpm</span>`;
}

function displayResultSection(paragraphLines, currentLine, charIndex) {
  testBoard.style.display = "none";
  testResultSection.style.display = "flex";
  const wpm = calculateTypeSpeed(paragraphLines, currentLine, charIndex);
  displayTypingResult(wpm);
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
  return totalWordsTyped;
}

function getSelectedDuration() {
  const duration = Number(
    currentTimeDuration.innerText.replace(/minute test/i, "").trim()
  );

  return duration;
}

function calculateTypeSpeed(paragraphLines, currentLine, charIndex) {
  const totalWordsTyped = countTotalWordsTyped(
    paragraphLines,
    currentLine,
    charIndex
  );
  const selectedDuration = getSelectedDuration();
  const wpm = Math.round((totalWordsTyped / (selectedDuration * 60)) * 60);

  return wpm;
}

function formatTime(timeUnit) {
  return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
}

function updateTimeDuration(minutes, seconds) {
  selectedTimeDuration.innerText = `${formatTime(minutes)}:${formatTime(
    seconds
  )}`;
}

function startCountdown(hasCountdownStarted, timeDuration) {
  let minutesLeft = timeDuration - 1;
  let secondsLeft = 60;
  const timeId =
    !hasCountdownStarted &&
    setInterval(() => {
      if (minutesLeft === 0 && secondsLeft === 0) {
        isTimeDurationEnded = true;
        clearInterval(timeId);
      } else if (secondsLeft === 0) {
        secondsLeft = 59;
        minutesLeft--;
      } else {
        secondsLeft--;
      }
      updateTimeDuration(minutesLeft, secondsLeft);
    }, 1000);
}

function addDynamicCSS(currentLine, direction) {
  const style = document.createElement("style");
  style.innerHTML = `.text-to-type > strong {
  transform: translateY(${
    direction === "forward"
      ? -(TRANSLATE_Y * (currentLine + 1))
      : -(TRANSLATE_Y * currentLine)
  }rem);}`;

  document.head.appendChild(style);
}

function onceUserStartTyping(paragraph, timeDuration) {
  const paragraphLines = Array.from(paragraph.querySelectorAll("strong"));
  let currentLine = 0;
  let charIndex = 0;
  let hasCountdownStarted = false;

  document.addEventListener("keydown", (e) => {
    startCountdown(hasCountdownStarted, timeDuration);
    hasCountdownStarted = true;

    if (isTimeDurationEnded) {
      displayResultSection(paragraphLines, currentLine, charIndex);
    }

    const typedChar = e.key;
    if (typedChar === "Shift" || typedChar === "CapsLock") return;
    if (!paragraphLines[currentLine]) return;

    const paragraphText = paragraphLines[currentLine].innerText.trim();
    const paragraphCharacters = Array.from(
      paragraphLines[currentLine].querySelectorAll("span")
    );

    if ((typedChar === " " || typedChar === "Enter") && charIndex === 0) {
      return;
    } else if (typedChar === "Backspace") {
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

        if (currentLine > 0) {
          currentLine--;
          addDynamicCSS(currentLine, "backward");
        }
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

        if (currentLine === paragraphLines.length - 1) {
          displayResultSection(paragraphLines, currentLine, charIndex);
          return;
        }

        addDynamicCSS(currentLine, "forward");

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

        if (currentLine === paragraphLines.length - 1) {
          displayResultSection(paragraphLines, currentLine, charIndex);
          return;
        }

        addDynamicCSS(currentLine, "forward");

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

function getSelectedTextDifficulty() {
  return currentTextDifficulty.innerText.split(" ")[0].trim().toLowerCase();
}

function generateParagraphHTMLElement() {
  const paraElement = document.createElement("p");
  paraElement.classList.add("text-to-type");
  paraElement.innerHTML = getParagraphInnerHTML(
    paragraphs[getSelectedTextDifficulty()]
  );

  return paraElement;
}

function startTest() {
  setUpSection.style.display = "none";
  testBoard.style.display = "flex";

  const duration = getSelectedDuration();
  selectedTimeDuration.innerText = `0${duration}:00`;

  const paragraph = generateParagraphHTMLElement();
  testBoard.appendChild(paragraph);

  closeTestButton.addEventListener("click", () => closeTestBoard());

  onceUserStartTyping(paragraph, duration);
}

startTestButton.addEventListener("click", () => {
  startTest();
});
