import getSpotifyAuth from './SpotifyAuthAPI';

const axios = require('axios').default;

// Fetch Spotify artist info
export async function getArtist(id, param = '', query = null) {
  // Get Spotify auth token
  const auth = await getSpotifyAuth();

  // Token url for API request
  const token_url = `https://api.spotify.com/v1/artists/${id}/${param}`;

  // API headers
  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  console.log(headers)

  try {
    // Fetch data using Axios
    const response = await axios.get(token_url, {
      headers: headers,
      params: query,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
