const questionsAndAnswers = [
  {
    question: "What is the capital of France?",
    answer: "The capital of France is Paris.",
  },
  {
    question: "Who wrote To Kill a Mockingbird",
    answer: "Harper Lee wrote To Kill a Mockingbird",
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter is the largest planet in our solar system.",
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answer: "France won the FIFA World Cup in 2018.",
  },
];

const article = document.querySelector("article");

function createSectionHTML(question, answer, index) {
  return `<div class="question">
            <h3>${question}</h3>
            <div class="icons special-${index.toString()}">
              <img
                src="./Assets/Icons/plusIcon.svg"
                alt="Plus Icon"
                class="open-btn"
              />
              <img
                src="./Assets/Icons/minusIcon.svg"
                alt="Minus Icon"
                class="close-btn"
              />
            </div>
          </div>
          <p class="answer special-${index.toString()}">${answer}</p>`;
}

function createSections(question, answer, index) {
  const section = document.createElement("section");
  section.innerHTML = createSectionHTML(question, answer, index);
  article.appendChild(section);
}

questionsAndAnswers.forEach(({ question, answer }, index) =>
  createSections(question, answer, index)
);

const toggleQuestions = [...document.querySelectorAll(".icons")];

function updateCurrentQuestionSection(prev, toggleBtn) {
  const answerElement = querySelectorWithin(document, `section p.${prev}`);
  answerElement.classList.toggle("open-answer");

  const { firstIcon, secondIcon } = getIcons(toggleBtn);
  if (firstIcon.style.display === "none") {
    updateIconVisibility(firstIcon, secondIcon, false);
  } else {
    updateIconVisibility(firstIcon, secondIcon, true);
  }
}

function previousCurrentQuestionSection(prev, toggleBtn) {
  const previousAnswerElement = querySelectorWithin(
    document,
    `section p.${prev}`
  );
  previousAnswerElement.classList.remove("open-answer");
  const parentElement = toggleBtn.parentNode.parentNode;

  const currentAnswerElement = querySelectorWithin(
    parentElement,
    `section p.${toggleBtn.classList[1]}`
  );
  currentAnswerElement.classList.add("open-answer");

  const previousFirstIcon = querySelectorWithin(document, `.${prev} .open-btn`);
  const previousSecondIcon = querySelectorWithin(
    document,
    `.${prev} .close-btn`
  );
  updateIconVisibility(previousFirstIcon, previousSecondIcon, false);

  const { firstIcon, secondIcon } = getIcons(toggleBtn);
  updateIconVisibility(firstIcon, secondIcon, true);
}

function openCurrentQuestionSection(prev, toggleBtn) {
  const parentElement = toggleBtn.parentNode.parentNode;
  const answerElement = querySelectorWithin(parentElement, `section p.${prev}`);
  answerElement.classList.add("open-answer");

  const { firstIcon, secondIcon } = getIcons(toggleBtn);
  updateIconVisibility(firstIcon, secondIcon, true);
}

function getIcons(toggleBtn) {
  const firstIcon = toggleBtn.querySelector(".open-btn");
  const secondIcon = toggleBtn.querySelector(".close-btn");
  return { firstIcon, secondIcon };
}

function updateIconVisibility(firstIcon, secondIcon, hide) {
  if (hide) {
    firstIcon.style.display = "none";
    secondIcon.style.display = "flex";
  } else {
    firstIcon.style.display = "flex";
    secondIcon.style.display = "none";
  }
}

function querySelectorWithin(element, path) {
  return element.querySelector(path);
}

let previousOpenedQuestion = "";

function handleClickEvent(currentClassName, toggleBtn) {
  if (previousOpenedQuestion === currentClassName) {
    updateCurrentQuestionSection(previousOpenedQuestion, toggleBtn);
  } else if (previousOpenedQuestion !== "") {
    previousCurrentQuestionSection(previousOpenedQuestion, toggleBtn);
    previousOpenedQuestion = currentClassName;
  } else {
    previousOpenedQuestion = currentClassName;
    openCurrentQuestionSection(previousOpenedQuestion, toggleBtn);
  }
}

toggleQuestions.forEach((toggleBtn) => {
  toggleBtn.addEventListener("click", () => {
    const currentClassName = toggleBtn.classList[1];
    handleClickEvent(currentClassName, toggleBtn);
  });
});
