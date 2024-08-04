const video = document.querySelector("#oceanVideo");
const [playBtn, pauseBtn] = [
  ...document.querySelectorAll(".video-controls button"),
];
const container = document.querySelector(".video-container");
const loading = document.querySelector(".loading");

function setUpInitialState() {
  container.style.display = "none";
  loading.style.display = "grid";
  pauseBtn.classList.add("pause-video");
}

setUpInitialState();

function updateButtonStyles(classToAdd, existClass, currentButton, nextButton) {
  if (nextButton.classList.contains(existClass)) {
    nextButton.classList.remove(existClass);
  }
  currentButton.classList.add(classToAdd);
}

playBtn.addEventListener("click", () => {
  video.play();
  updateButtonStyles("play-video", "pause-video", playBtn, pauseBtn);
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  updateButtonStyles("pause-video", "play-video", pauseBtn, playBtn);
});

window.addEventListener("load", () => {
  container.style.display = "flex";
  loading.style.display = "none";
});
