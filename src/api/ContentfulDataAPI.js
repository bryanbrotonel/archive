const axios = require('axios').default;

async function getContentfulData(query, collection) {
  const token_url = `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_TOKEN}`,
  };

  const body = JSON.stringify({ query });

  try {
    const response = await axios.post(token_url, body, {
      headers: headers,
    });

    return response.data.asset != null
      ? response.data.asset
      : response.data.data[collection].items.length == 1
      ? response.data.data[collection].items[0]
      : response.data.data[collection].items;
  } catch (e) {
    console.log(e);
  }
}

export default getContentfulData;
