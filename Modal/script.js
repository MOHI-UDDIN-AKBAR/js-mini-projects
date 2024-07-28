document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.querySelector(".modal-project button");
  const modalOverlay = document.querySelector(".modal-overlay");
  const closeModalBtn = document.querySelector(".modal-content button");

  function toggleModal() {
    modalOverlay.style.display =
      modalOverlay.style.display === "grid" ? "none" : "grid";
  }

  openModalBtn.addEventListener("click", toggleModal);

  closeModalBtn.addEventListener("click", toggleModal);
});
