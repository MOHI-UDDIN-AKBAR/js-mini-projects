const menuBar = document.querySelector(".btn-menu");
const navigationLinks = document.querySelector(".nav-links");

let isOpen = false;

function toggleNavigation() {
  isOpen = !isOpen;
  navigationLinks.style.display = isOpen ? "grid" : "none";
  menuBar.classList.toggle("animation-open", isOpen);
  menuBar.classList.toggle("animation-close", !isOpen);
}

menuBar.addEventListener("click", toggleNavigation);
