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
          artistBio
          featured
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
          let artistData = {};

          const artistContentfulData = contentfulRes.find(
            (element) => element.artistId == artist.id
          );

          // Get link of artist from Contentful data
          let artistLink = artistContentfulData.link;

          // Set base data
          artistData = {
            name: artist.name,
            image: artist.images[1],
            link: artistLink,
          };

          // If featured artist, add necessary data
          if (artistContentfulData.featured) {
            artistData = {
              featured: artistContentfulData.featured,
              bio: artistContentfulData.artistBio,
              ...artistData,
            };
          }

          // Append artist data to array
          artists.push(artistData);
        });
      });

      return artists;
    })
    .catch(function (error) {
      console.log(error);
    });
}
