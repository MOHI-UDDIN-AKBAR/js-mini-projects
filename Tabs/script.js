const controlButton = [
  ...document.querySelectorAll(".tab-control-buttons button"),
];
const tabs = [...document.querySelectorAll(".tabs-info div")];
const bgColor = "rgb(31, 38, 51, 0.1)";

function initialTabSetUp() {
  let [activeTabButton] = [...controlButton];
  activeTabButton.classList.add("active");
}

function setActiveTabs(e) {
  const activeTabButton = e.target;

  controlButton.forEach((button, i) => {
    button.classList.remove("active");
  });

  tabs.forEach((tab) => {
    if (tab.classList.contains(activeTabButton.id)) {
      tab.style.display = "flex";
    } else {
      tab.style.display = "none";
    }
  });
  activeTabButton.classList.add("active");
}

controlButton.forEach((button) => {
  initialTabSetUp();
  button.addEventListener("click", (e) => setActiveTabs(e));
});
