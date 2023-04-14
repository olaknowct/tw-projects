'use strict';
import { createUrlEndpoint, getShortlink, removeBurgerNav } from './helpers.js';
import { DOM } from './dom.js';

let vwidth;

// Validation
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
    throw Error('Please enter something');
  }

  if (!isValidHttpUrl(link)) {
    throw Error('Not a valid link!');
  }
};

// Handler
const shortenLinkHandler =  (e) => {
  try {
    e.preventDefault();
    DOM.errMsg.innerHTML = '';

    validateLinkInput(DOM.formShortenInput.value);

    const url = createUrlEndpoint(DOM.formShortenInput.value);

    loadSpinner.classList.remove('hidden');

    const res = await getShortLink(url);

    createShortenLinkEl(res);
  } catch (e) {
    console.log(e);
  }
};

const navToggleHandler = () => {
  DOM.btn.classList.toggle('open');
  DOM.menu.classList.toggle('block');
  DOM.menu.classList.toggle('hidden');
};

const createShortenLinkEl = (data) => {
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
};

const calcBrowserWith = () => {
  vwidth = window.innerWidth;
  if (vwidth > '1024') removeBurgerNav();
};

// Event listeners
DOM.btn.addEventListener('click', navToggleHandler);
DOM.shortenButton.addEventListener('click', shortenLinkHandler);
addEventListener('resize', calcBrowserWith);
