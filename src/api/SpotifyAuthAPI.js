const axios = require('axios').default;
const Buffer = require('buffer/').Buffer;
const qs = require('qs');

// Fetch Spotify authentication access token
async function getSpotifyAuth() {
  // Token url for API request
  const token_url = 'https://accounts.spotify.com/api/token';

  // API headers
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`,
      'utf-8'
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // Format grant-type to string
  const form = qs.stringify({ grant_type: 'client_credentials' });

  try {
    // Fetch data using Axios
    const response = await axios.post(token_url, form, {
      headers: headers,
    });

    // Retrun auth access token
    return response.data.access_token;
  } catch (e) {
    console.log(e);
  }
}

export default getSpotifyAuth;
