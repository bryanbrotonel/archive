const axios = require('axios').default;
const qs = require('qs');

// Get auth token
const auth = axios
  .get('/.netlify/functions/SpotifyAuthAPI')
  .then((response) => response.data);

// Fetch Spotify artist info
export async function getSpotifyArtist(id = '', param = '', query = null) {
  // Get Spotify auth token

  const idStringQuery = id != '' ? `/${id}` : '';
  const paramStringQuery = param != '' ? `/${param}` : '';

  // Token url for API request
  const token_url = `https://api.spotify.com/v1/artists${idStringQuery}${paramStringQuery}`;

  // API headers
  const headers = {
    Authorization: `Bearer ${await auth}`,
  };

  try {
    // Fetch data using Axios
    const response = await axios.get(token_url, {
      headers: headers,
      params: query,
      paramsSerializer: function (params) {
        return qs.stringify(params);
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
