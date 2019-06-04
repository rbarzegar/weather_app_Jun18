console.log('Client side javascript file is working');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  if (location) {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const url = `/weather?address=${location}`;
    fetch(url).then(res => {
      res.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.innerHTML = `<span class="bold">Forecast:</span> ${
            data.forecast
          }`;
          messageTwo.innerHTML = `<span class="bold">Location:</span> ${
            data.location
          }`;
        }
      });
    });
  } else {
    messageOne.textContent = 'Error - please enter an address';
  }
});

const btnClear = document.querySelector('#clearOutputs');

btnClear.addEventListener('click', e => {
  e.preventDefault();
  messageOne.textContent = '';
  messageTwo.textContent = '';
  search.value = '';
});
