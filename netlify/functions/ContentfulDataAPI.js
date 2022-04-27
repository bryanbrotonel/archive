const axios = require('axios').default;

exports.handler = async function (event, context) {
  const { query, collection } = event.queryStringParameters;

  const token_url = `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_TOKEN}`,
  };

  const body = JSON.stringify({ query });

  return (
    axios
      .post(token_url, body, {
        headers: headers,
      })
      // Retrun contentful data
      .then((response) => ({
        statusCode: 200,
        body: JSON.stringify(
          response.data.asset != null
            ? response.data.asset
            : response.data.data[collection].items.length == 1
            ? response.data.data[collection].items[0]
            : response.data.data[collection].items
        ),
      }))
      // Return error
      .catch((error) => ({ statusCode: 404, body: error.toString() }))
  );
};
