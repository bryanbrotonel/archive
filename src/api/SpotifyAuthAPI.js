const axios = require('axios').default;
const Buffer = require('buffer/').Buffer;
const qs = require('qs');

async function getSpotifyAuth() {
  const token_url = 'https://accounts.spotify.com/api/token';

  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
      'utf-8'
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const form = qs.stringify({ grant_type: 'client_credentials' });

  try {
    const response = await axios.post(token_url, form, {
      headers: headers,
    });
    return response.data.access_token;
  } catch (e) {
    console.log(e);
  }
}

export default getSpotifyAuth;
