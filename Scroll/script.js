const menuBar = document.querySelector(".menu-bar");
const navigation = document.querySelector(".navigation");
const scrollUp = document.querySelector(".scroll-up");
const header = document.querySelector("header");
const navigationLinks = navigation.querySelectorAll(" ul li a");
const sectionHome = document.querySelector("#Home");

let isOpen = false;

function updateNavigationStyles(navigation, classToAdd, classToRemove) {
  navigation.classList.remove(classToRemove);
  navigation.classList.add(classToAdd);
}

function handleNavigationStyles() {
  console.log("coming");
  if (!isOpen) {
    updateNavigationStyles(navigation, "show-navigation", "hide-navigation");
    isOpen = true;
  } else {
    updateNavigationStyles(navigation, "hide-navigation", "show-navigation");
    isOpen = false;
  }
}

if (window.innerWidth <= 768) {
  menuBar.addEventListener("click", () => handleNavigationStyles());
}

function updateHeaderStyles(
  header,
  classToAdd,
  classToRemove,
  navigationTextColor,
  deviceType
) {
  header.classList.remove(classToRemove);
  header.classList.add(classToAdd);
  navigationLinks.forEach((link) => {
    deviceType === "mobile"
      ? (link.style.color = "#1f2633")
      : (link.style.color = navigationTextColor);
  });
}

window.addEventListener("scroll", () => {
  const currentPositionOfHome = sectionHome.getBoundingClientRect();
  const deviceType = window.innerWidth <= 768 ? "mobile" : "desktop";
  currentPositionOfHome.top <= -140
    ? updateHeaderStyles(
        header,
        "fixed-header",
        "static-header",
        "#1f2633",
        deviceType
      )
    : updateHeaderStyles(
        header,
        "static-header",
        "fixed-header",
        "white",
        deviceType
      );
});

scrollUp.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
