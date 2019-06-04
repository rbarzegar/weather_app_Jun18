const url = 'http://quotes.rest/qod.json';
const quotePara = document.getElementById('quote');
window.addEventListener('load', e => {
  quotePara.textContent = 'Loading...';
  fetch(url).then(res => {
    res.json().then(data => {
      if (data.error) {
        quotePara.textContent = data.error;
      } else {
        quotePara.textContent = data.contents.quotes[0].quote;
      }
    });
  });
});
