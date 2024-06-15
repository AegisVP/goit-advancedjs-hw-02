const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

startBtnRef.addEventListener('click', onStartClick);
stopBtnRef.addEventListener('click', onStopClick);

let timerColorSwitcher = null;
let originalBgColor = null;
// let isTimerStarted = false;

function onStartClick() {
  // if (isTimerStarted) return;
  originalBgColor = document.body.style.backgroundColor;

  timerColorSwitcher = setInterval(doChangeBgColor, 1000);

  // isTimerStarted = true;
  setButtonState(startBtnRef, true);
  setButtonState(stopBtnRef, false);
}

function onStopClick() {
  clearInterval(timerColorSwitcher);

  document.body.style.backgroundColor = originalBgColor;

  // isTimerStarted = false;
  setButtonState(startBtnRef, false);
  setButtonState(stopBtnRef, true);
}

function doChangeBgColor(newBgColor = getRandomHexColor()) {
  document.body.style.backgroundColor = newBgColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setButtonState(btn, state = true) {
  if (state) btn?.setAttribute('disabled', true);
  else btn?.removeAttribute('disabled');

  console.log(
    `Set button "${btn.textContent}" state to ${
      !state ? 'enabled' : 'disabled'
    }`
  );
}
