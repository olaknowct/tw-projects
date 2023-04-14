const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const errMsg = document.getElementById('err-msg');
const shortenButton = document.querySelector('.form-shorten__btn');
const formShortenInput = document.querySelector('.form-shorten__input');
const formShorten = document.querySelector('.form-shorten');
const loadSpinner = document.querySelector('.load-spinner');

let vwidth;

function navToggle() {
  btn.classList.toggle('open');
  menu.classList.toggle('block');
  menu.classList.toggle('hidden');
}

function calcBrowserWith() {
  vwidth = window.innerWidth;
  if (vwidth > '1024') removeBurgerNav();
}

const removeBurgerNav = () => {
  btn.classList.remove('open');
  menu.classList.remove('block');
  menu.classList.add('hidden');
};

// window.onload = calcBrowserWith;
window.onresize = calcBrowserWith;
btn.addEventListener('click', navToggle);

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

shortenButton.addEventListener('click', (e) => {
  e.preventDefault();
  const link = formShortenInput.value;
  errMsg.innerHTML = '';

  if (link === '') {
    errMsg.innerHTML = 'Please enter something';
    formShortenInput.classList.add('border-red');
    return;
  }

  if (!isValidHttpUrl(link)) {
    errMsg.innerHTML = 'Not a valid Link';
    formShortenInput.classList.add('border-red');
    return;
  }

  const url = `https://api.shrtco.de/v2/shorten?url=${link}/very/long/link.html`;

  async function getShortLink() {
    const res = await fetch(url);
    const data = await res.json();

    return data.result;
  }

  loadSpinner.classList.remove('hidden');

  getShortLink().then((res) => createShortenLinkEl(res));
});

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

  formShorten.insertAdjacentHTML('afterend', html);
}
