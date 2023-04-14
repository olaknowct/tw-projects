'use strict';
import { createUrlEndpoint } from './helpers.js';
import { DOM } from './dom.js';

let vwidth;

function navToggle() {
  DOM.btn.classList.toggle('open');
  DOM.menu.classList.toggle('block');
  DOM.menu.classList.toggle('hidden');
}

function calcBrowserWith() {
  vwidth = window.innerWidth;
  if (vwidth > '1024') removeBurgerNav();
}

const removeBurgerNav = () => {
  DOM.btn.classList.remove('open');
  DOM.menu.classList.remove('block');
  DOM.menu.classList.add('hidden');
};

// window.onload = calcBrowserWith;
window.onresize = calcBrowserWith;
DOM.btn.addEventListener('click', navToggle);

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

const validateLinkInput = (link) => {
  if (link === '') {
    DOM.errMsg.innerHTML = 'Please enter something';
    DOM.formShortenInput.classList.add('border-red');
    return;
  }

  if (!isValidHttpUrl(link)) {
    errMsg.innerHTML = 'Not a valid Link';
    formShortenInput.classList.add('border-red');
    return;
  }
};

const shortenLinkHandler = (e) => {
  e.preventDefault();
  const link = DOM.formShortenInput.value;
  DOM.errMsg.innerHTML = '';

  validateLinkInput(link);

  const url = createUrlEndpoint(link);

  async function getShortLink() {
    const res = await fetch(url);
    const data = await res.json();

    return data.result;
  }

  loadSpinner.classList.remove('hidden');

  getShortLink().then((res) => createShortenLinkEl(res));
};

DOM.shortenButton.addEventListener('click', shortenLinkHandler);

function createShortenLinkEl(data) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>chr</li>");
  const { full_short_link, original_link } = data;
  const html = `      
  <li
    class="flex group flex-col items-center rounded-lg bg-white px-6 py-6 font-bold md:flex-row md:justify-between md:gap-4"
  >
    <a href="">${original_link} </a>
    <a href="" class="text-cyan md:ml-auto">${full_short_link} </a>
    <button class="group-odd:bg-cyan group-even:bg-darkViolet mt-2 rounded-lg bg-cyan px-6 py-2 text-white hover:opacity-50 md:mt-0">
      Copy
    </button>
  </li>`;

  DOM.formShorten.insertAdjacentHTML('afterend', html);
}
