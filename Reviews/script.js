import { reviewers } from "./reviewerData.js";

// Select elements once at the beginning
const reviewerImg = document.querySelector("main article img");
const reviewerName = document.querySelector("main article div h3");
const reviewerRole = document.querySelector("main article div span");
const reviewerInfo = document.querySelector("main article p");
const previousButton = document.querySelector(".pagination .previous");
const nextButton = document.querySelector(".pagination .next");
const surpriseButton = document.querySelector(".random-avatar");

let currentIndex = 0;

function updateReviewer({
  reviewerImg: { img, alt },
  reviewerName: name,
  reviewerRole: role,
  reviewerInfo: info,
}) {
  reviewerImg.src = img;
  reviewerImg.alt = alt;
  reviewerName.innerText = name;
  reviewerRole.innerText = role;
  reviewerInfo.innerText = info;
}

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > reviewers.length - 1) {
    currentIndex = 0;
    updateReviewer(reviewers[currentIndex]);
  } else {
    updateReviewer(reviewers[currentIndex]);
  }
});

previousButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = reviewers.length - 1;
    updateReviewer(reviewers[currentIndex]);
  } else {
    updateReviewer(reviewers[currentIndex]);
  }
});

surpriseButton.addEventListener("click", () => {
  const randomCounter = Math.floor(Math.random() * reviewers.length);
  console.log(randomCounter);
  updateReviewer(reviewers[randomCounter]);
});
