const span = document.querySelector("span");
const buttons = [...document.querySelectorAll("button")];

let count = 0;
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const text = button.innerText;
    if (text.toLowerCase() === "decrement") {
      count--;
    } else if (text.toLowerCase() === "reset") {
      count = 0;
    } else if (text.toLowerCase() === "increment") {
      count++;
    }
    span.innerText = count;
    // Update color based on count value
    count < 0 ? (span.style.color = "red") : (span.style.color = "#1f2633");
  });
});
