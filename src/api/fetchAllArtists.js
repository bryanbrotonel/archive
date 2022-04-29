import { getSpotifyArtist } from './SpotifyArtistAPI';

const axios = require('axios').default;

export default async function fetchArtistData() {
  // Contentful query that queries for all artists
  const query = `
    {
      artistCollection {
        items {
          artistId
          link
        }
      }
    }
    `;

  // POST request to fetch Contentful data
  return await axios
    .post('/.netlify/functions/ContentfulDataAPI', {
      // Query to fetch sepcified data
      query: query,

      // Collection to fetch data from
      collection: 'artistCollection',
    })
    .then(async (response) => {
      const contentfulRes = response.data;

      let idsString = '';
      let artists = [];

      contentfulRes.forEach((artist) => {
        idsString = idsString.concat(artist.artistId + ',');
      });

      // Remove last comma from id qyer
      let idQuery = { ids: idsString.slice(0, -1) };

      await getSpotifyArtist('', '', idQuery).then((response) => {
        response.artists.forEach((artist) => {
          // Get link of artist from Contentful response
          let artistLink = contentfulRes.find(
            (element) => element.artistId == artist.id
          ).link;

          // Append artist data to array
          artists.push({
            name: artist.name,
            image: artist.images[1],
            link: artistLink,
          });
        });
      });

      return artists;
    })
    .catch(function (error) {
      console.log(error);
    });
}
