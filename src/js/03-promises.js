import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.7.min.css';

const formRef = document.querySelector('form.form');
const butnRef = document.querySelector('form button[type="submit"]');
formRef.addEventListener('submit', onPromiseFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.4) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseFormSubmit(e) {
  e.preventDefault();
  const { amount, delay, step } = e.currentTarget;

  // setting form data to variable
  const numOfPromises = parseInt(amount.value);
  const initialDelay = parseInt(delay.value);
  const additionalDelay = parseInt(step.value);


  for (let i = 0; i < numOfPromises; i += 1) {
    const promiseDelay = initialDelay * 1 + i * additionalDelay;

    createPromise(i + 1, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  butnRef.disabled = true;
  setTimeout(() => {
    butnRef.disabled = false;
  }, (numOfPromises * additionalDelay + initialDelay) * 1);
}
