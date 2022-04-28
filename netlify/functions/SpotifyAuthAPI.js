const axios = require('axios').default;
const Buffer = require('buffer/').Buffer;
const qs = require('qs');

exports.handler = async function (event, context) {
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
  const body = qs.stringify({ grant_type: 'client_credentials' });

  return (
    axios
      .post(token_url, body, {
        headers: headers,
      })
      // Retrun auth access token
      .then((response) => ({
        statusCode: 200,
        body: response.data.access_token,
      }))
      // Return error
      .catch((error) => ({ statusCode: 404, body: error.toString() }))
  );
};
