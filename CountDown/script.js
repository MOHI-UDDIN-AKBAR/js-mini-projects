const fixDateElement = document.querySelector(".fix-date");
const [daysElement, hoursElement, minutesElement, secondsElement] = [
  ...document.querySelectorAll(".countDown-time div h2"),
];

function setSalesDuration() {
  const salesDuration = new Date();
  salesDuration.setDate(salesDuration.getDate() + 3);

  const formattedSalesDuration = `${salesDuration.toDateString()} ${
    salesDuration.toLocaleString().split(",")[1]
  }`;
  fixDateElement.innerText = formattedSalesDuration;

  return salesDuration;
}

function calculateTimeRemaining(salesDuration) {
  const currentTime = new Date();
  const timeLeft = salesDuration.getTime() - currentTime.getTime();

  let dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const remainingDuration = { dayLeft, hoursLeft, minutesLeft, secondsLeft };

  return remainingDuration;
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function updateCountDownDisplay({
  dayLeft,
  hoursLeft,
  minutesLeft,
  secondsLeft,
}) {
  daysElement.innerText = formatTime(dayLeft);
  hoursElement.innerText = formatTime(hoursLeft);
  minutesElement.innerText = formatTime(minutesLeft);
  secondsElement.innerText = formatTime(secondsLeft);
}

function startCountDown({ dayLeft, hoursLeft, minutesLeft, secondsLeft }) {
  const intervalId = setInterval(() => {
    secondsLeft--;

    if (secondsLeft < 0) {
      secondsLeft = 59;
      minutesLeft--;
      if (minutesLeft < 0) {
        minutesLeft = 59;
        hoursLeft--;
        if (hoursLeft < 0) {
          hoursLeft = 23;
          dayLeft--;
        }
      }
    }

    if (
      secondsLeft === 0 &&
      minutesLeft === 0 &&
      hoursLeft === 0 &&
      dayLeft == 0
    ) {
      clearInterval(intervalId);
    }
    const timeDurationPerSeconds = {
      dayLeft,
      hoursLeft,
      minutesLeft,
      secondsLeft,
    };

    updateCountDownDisplay(timeDurationPerSeconds);
  }, 1000);
}

function initializeCountDown() {
  const salesDuration = setSalesDuration();
  let remainingDuration = calculateTimeRemaining(salesDuration);

  startCountDown(remainingDuration);
}

initializeCountDown();
