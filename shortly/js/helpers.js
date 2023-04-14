import { DOM } from './dom.js';

export const getShortLink = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUrlEndpoint = (link) => {
  return `https://api.shrtco.de/v2/shorten?url=${link}/very/long/link.html`;
};

export const removeBurgerNav = () => {
  DOM.btn.classList.remove('open');
  DOM.menu.classList.remove('block');
  DOM.menu.classList.add('hidden');
};
