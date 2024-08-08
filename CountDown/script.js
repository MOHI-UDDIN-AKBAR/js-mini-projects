const fixDateElement = document.querySelector(".fix-date");
const [daysElement, hoursElement, minutesElement, secondsElement] = [
  ...document.querySelectorAll(".countDown-time div h2"),
];

const countDownElement = document.querySelector(".countDown-time");

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
  const remainingDuration = {
    dayLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    timeLeft,
  };

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

function startCountDown(salesDuration) {
  const intervalId = setInterval(() => {
    let { dayLeft, hoursLeft, minutesLeft, secondsLeft, timeLeft } =
      calculateTimeRemaining(salesDuration);

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      countDownElement.innerHTML = `<h3 class="expired">Sorry, The Give had Expired.</h3>`;
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
  startCountDown(salesDuration);
}

initializeCountDown();
