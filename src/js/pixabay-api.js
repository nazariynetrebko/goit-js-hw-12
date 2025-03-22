import axios from 'axios';

const API_KEY = '49351008-1bfee9cf32a9c846c40651839';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 15,
    safesearch: true,
  };

  const response = await axios.get(BASE_URL, { params });

  if (!response.data.hits.length) {
    throw new Error('No images found');
  }

  return {
    images: response.data.hits,
    totalHits: response.data.totalHits,
  };
}
