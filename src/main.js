import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

window.addEventListener('load', () => {
  loader.style.display = 'none';
});

function loaderToggle(isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const inputField = event.target.elements['search-text'];
  const query = inputField.value.trim();

  if (!query) {
    showWarning('Please enter a search query!');
    return;
  }

  resetSearchState();
  currentQuery = query;

  try {
    loaderToggle(true);
    const { images, totalHits } = await fetchImages(currentQuery, currentPage);

    if (!images.length) {
      showError('No images found');
      return;
    }

    renderGallery(images, gallery);
    handlePagination(totalHits);
  } catch (error) {
    showError(error.message);
  } finally {
    loaderToggle(false);
    inputField.value = '';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  loadMoreBtn.classList.add('hidden');
  loaderToggle(true);

  try {
    const { images, totalHits } = await fetchImages(currentQuery, currentPage);

    setTimeout(() => {
      renderGallery(images, gallery, true);
      smoothScroll();
      handlePagination(totalHits);
    }, 500);
  } catch (error) {
    showError(error.message);
  } finally {
    setTimeout(() => {
      loaderToggle(false);
    }, 500);
  }
});

function resetSearchState() {
  currentPage = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  endMessage.classList.add('hidden');
}

function handlePagination(totalHits) {
  const maxPage = Math.ceil(totalHits / perPage);
  if (currentPage >= maxPage) {
    endMessage.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.remove('hidden');
  }
}

function smoothScroll() {
  if (gallery.lastElementChild) {
    gallery.lastElementChild.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

function showWarning(message) {
  iziToast.warning({ title: 'Warning', message, position: 'topRight' });
}

function showError(message) {
  iziToast.error({ title: 'Error', message, position: 'topRight' });
}
