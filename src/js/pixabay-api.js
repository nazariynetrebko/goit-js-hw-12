import axios from 'axios';

const API_KEY = '49351008-1bfee9cf32a9c846c40651839';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 20,
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => {
      if (!response.data.hits.length) {
        return Promise.reject(new Error('No images found'));
      }
      return response.data.hits;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
