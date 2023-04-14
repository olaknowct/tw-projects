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
    formShortenInputClass.contains('placeholder-red', 'outline-2', 'outline-red', 'outline')
      ? formShortenInputClass.remove('placeholder-red', 'outline-2', 'outline-red', 'outline')
      : '';

    validateLinkInput(link);

    const url = createUrlEndpoint(link);

    const res = await getShortLink(url);

    createShortenLinkEl(res.result.full_short_link, link);

    DOM.errMsg.innerHTML = '';
    DOM.loadSpinner.classList.add('hidden');
    DOM.shortenButton.removeAttribute('disabled');
  } catch (e) {
    DOM.errMsg.innerHTML = e.message;
    DOM.errMsg.innerHTML = '';
    DOM.loadSpinner.classList.add('hidden');
    DOM.shortenButton.removeAttribute('disabled');
    DOM.formShortenInput.classList.remove('placeholder-yellow-500');
    DOM.formShortenInput.classList.add('placeholder-red', 'outline-red', 'outline');
    return;
  }
};

const navToggleHandler = () => {
  DOM.btn.classList.toggle('open');
  DOM.menu.classList.toggle('block');
  DOM.menu.classList.toggle('hidden');
};

const copyHandler = (btn) => {
  btn.classList.remove('bg-cyan');
  btn.classList.add('bg-darkViolet');
  btn.innerText = 'Copied';
  navigator.clipboard.writeText(btn.dataset.link);
};

const publishCopyHandler = (copyHandler) => {
  DOM.listLink.addEventListener('click', function (e) {
    const btn = e.target.closest('.copy-btn');

    if (!btn) return;

    copyHandler(btn);
  });
};

const createShortenLinkEl = (fullShortLink, orginalLink) => {
  const html = `      
  <li
    class="flex flex-col items-center rounded-lg bg-white px-6 py-6 font-bold md:flex-row md:justify-between md:gap-4"
  >
    <a href="">${orginalLink} </a>
    <a href="" class="text-cyan md:ml-auto short-link">${fullShortLink} </a>
    <button class="bg-cyan mt-2 rounded-lg bg-cyan px-6 py-2 text-white hover:opacity-70 md:mt-0 copy-btn" data-link='${fullShortLink}'>
      Copy
    </button>
  </li>`;

  // const copyButton = document.querySelector('.copy-btn');

  // copyButton.addEventListener('click', copyHandler);

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
publishCopyHandler(copyHandler);
