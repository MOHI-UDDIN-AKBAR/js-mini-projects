document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const menuBar = document.querySelector(".btn-menu");
  const navigation = document.querySelector("nav");
  const closeNavBtn = document.querySelector(".cancel");

  menuBar.addEventListener("click", () => {
    navigation.classList.toggle("toggle-nav");

    if (window.innerWidth / 16 <= 31.25) {
      container.style.gridTemplateColumns = "1fr";
      menuBar.style.display = "none";
      navigation.style.width = "100%";
    }
  });

  closeNavBtn.addEventListener("click", () => {
    navigation.classList.remove("toggle-nav");
    container.style.gridTemplateColumns = "1fr 0.1fr";
    menuBar.style.display = "grid";
  });
});
