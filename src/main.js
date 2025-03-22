import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  loader.style.display = 'none';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const inputField = event.target.elements['search-text'];
  const query = inputField.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Попередження',
      message: 'Введіть пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.style.display = 'block';

  setTimeout(() => {
    fetchImages(query)
      .then(images => {
        if (images.length === 0) {
          iziToast.error({
            title: 'Error',
            message: 'No images found',
            position: 'topRight',
          });
          return;
        }
        renderGallery(images, gallery);
      })
      .catch(error => {
        iziToast.error({
          title: 'Error',
          message: 'Failed to fetch images',
          position: 'topRight',
        });
      })
      .finally(() => {
        inputField.value = '';
        loader.style.display = 'none';
      });
  }, 700);
});
