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
    loaderToggle();
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
    loaderToggle();
    inputField.value = '';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  loadMoreBtn.classList.add('hidden');
  loaderToggle();

  try {
    const { images, totalHits } = await fetchImages(currentQuery, currentPage);
    renderGallery(images, gallery);
    smoothScroll();
    handlePagination(totalHits);
  } catch (error) {
    showError(error.message);
  } finally {
    loaderToggle();
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
  const galleryItem = gallery.firstElementChild;
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

function loaderToggle() {
  loader.classList.toggle('hidden');
}

function showWarning(message) {
  iziToast.warning({ title: 'Warning', message, position: 'topRight' });
}

function showError(message) {
  iziToast.error({ title: 'Error', message, position: 'topRight' });
}
