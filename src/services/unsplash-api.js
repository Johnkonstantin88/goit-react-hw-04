import axios from 'axios';

const ACCESS_KEY = 'lZRghMy73VppnumKharDvrkXy1y0d5jKYDF72QdWW04';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export async function getPhotosBySearchValue(query, page = 1) {
  const params = new URLSearchParams({
    query: `${query}`,
    page: page,
    orientation: 'landscape',
    client_id: ACCESS_KEY,
  });

  const response = await axios.get('/search/photos', { params });
  return response.data;
}
