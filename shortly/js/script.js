const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
let vwidth;

function navToggle() {
  btn.classList.toggle('open');
  menu.classList.toggle('block');
  menu.classList.toggle('hidden');
}

const removeBurgerNav = () => {
  btn.classList.remove('open');
  menu.classList.remove('block');
  menu.classList.add('hidden');
};

function calcBrowserWith() {
  vwidth = window.innerWidth;
  if (vwidth > '1024') removeBurgerNav;
}

// window.onload = calcBrowserWith;
window.onresize = calcBrowserWith;
btn.addEventListener('click', navToggle);
