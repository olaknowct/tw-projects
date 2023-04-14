'use strict';
import { createUrlEndpoint, getShortLink, removeBurgerNav } from './helpers.js';
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
const shortenLinkHandler = async (e) => {
  try {
    e.preventDefault();
    const link = DOM.formShortenInput.value;
    const formShortenInputClass = DOM.formShortenInput.classList;
    DOM.errMsg.innerHTML = '';
    DOM.loadSpinner.classList.remove('hidden');

    DOM.shortenButton.setAttribute('disabled', '');

    // check and remove error styles
    formShortenInputClass.contains('placeholder-red', 'border-2', 'border-red')
      ? formShortenInputClass.remove('placeholder-red', 'border-2', 'border-red')
      : '';

    validateLinkInput(link);

    const url = createUrlEndpoint(link);

    const res = await getShortLink(url);

    createShortenLinkEl(res.result.full_short_link, link);

    DOM.loadSpinner.classList.add('hidden');
    DOM.shortenButton.removeAttribute('disabled');
  } catch (e) {
    DOM.errMsg.innerHTML = e.message;
    DOM.loadSpinner.classList.add('hidden');
    DOM.shortenButton.removeAttribute('disabled');
    DOM.formShortenInput.classList.remove('placeholder-yellow-500');
    DOM.formShortenInput.classList.add('border-2', 'placeholder-red', 'border-red');
    return;
  }
};

const navToggleHandler = () => {
  DOM.btn.classList.toggle('open');
  DOM.menu.classList.toggle('block');
  DOM.menu.classList.toggle('hidden');
};

const createShortenLinkEl = (fullShortLink, orginalLink) => {
  const html = `      
  <li
    class="flex  flex-col items-center rounded-lg bg-white px-6 py-6 font-bold md:flex-row md:justify-between md:gap-4"
  >
    <a href="">${orginalLink} </a>
    <a href="" class="text-cyan md:ml-auto">${fullShortLink} </a>
    <button class="bg-cyan  mt-2 rounded-lg bg-cyan px-6 py-2 text-white hover:opacity-50 md:mt-0">
      Copy
    </button>
  </li>`;

  DOM.listLink.insertAdjacentHTML('afterbegin', html);
};

const calcBrowserWith = () => {
  vwidth = window.innerWidth;
  if (vwidth > '1024') removeBurgerNav();
};

// Event listeners
DOM.btn.addEventListener('click', navToggleHandler);
DOM.shortenButton.addEventListener('click', shortenLinkHandler);
addEventListener('resize', calcBrowserWith);
