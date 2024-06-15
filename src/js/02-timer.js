import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.7.min.css';

const startCountdownBtnRef = document.querySelector('button[data-start]');
const countdownDateRef = document.querySelector('input#datetime-picker');
const countdownDisplayDaysRef = document.querySelector('span.value[data-days]');
const countdownDisplayHoursRef = document.querySelector(
  'span.value[data-hours]'
);
const countdownDisplayMinutesRef = document.querySelector(
  'span.value[data-minutes]'
);
const countdownDisplaySecondsRef = document.querySelector(
  'span.value[data-seconds]'
);

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseFlatpickr(selectedDates[0]);
  },
};

let targetTime = null;
let countdownTimer = null;

flatpickr(countdownDateRef, flatpickrOptions);
startCountdownBtnRef.setAttribute('disabled', true);
startCountdownBtnRef.addEventListener('click', onStartBtnClick);

function doCountdown() {
  const now = Date.now();

  if (now >= targetTime) {
    clearInterval(countdownTimer);
    updateDisplay(convertMs(0));

    startCountdownBtnRef.disabled = true;
    countdownDateRef.disabled = false;
    Notify.success('Countdown finished!');
    return;
  }

  updateDisplay(convertMs(targetTime - now));
  countdownDateRef.disabled = true;
}

function updateDisplay({ days, hours, minutes, seconds }) {
  countdownDisplayDaysRef.textContent = days;
  countdownDisplayHoursRef.textContent = hours;
  countdownDisplayMinutesRef.textContent = minutes;
  countdownDisplaySecondsRef.textContent = seconds;
}

function onCloseFlatpickr(selectedDate) {
  targetTime = selectedDate.getTime();

  startCountdownBtnRef.disabled = !isSelectedTimeInFuture(targetTime);
}

function isSelectedTimeInFuture(ms) {
  const now = Date.now();

  if (now >= ms) {
    startCountdownBtnRef.disabled = true;
    countdownDateRef.disabled = false;
    Notify.failure('Select time in the future');
  } else {
    return true;
  }

  return false;
}

function onStartBtnClick() {
  startCountdownBtnRef.disabled = true;
  if (!isSelectedTimeInFuture(targetTime)) {
    return;
  }

  countdownTimer = setInterval(doCountdown, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}
