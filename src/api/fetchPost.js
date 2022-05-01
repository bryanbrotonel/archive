import { getSpotifyArtist } from './SpotifyArtistAPI';

const axios = require('axios').default;

export default async function fetchPost(id, title) {
  // Contentful query that queries for all artists
  const query = `
    {
      postCollection(where: {sys: {id_contains: "${id}"}, title_contains: "${title}"}) {
        items {
          title
          subtitle
          date
          content
          artistsCollection {
            items {
              artistId
              link
            }
          }
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
      collection: 'postCollection',
    })
    .then(async (response) => {
      const contentfulRes = response.data;
      const {title, subtitle, date, content, artistsCollection} = contentfulRes
      const contentfulArtists = artistsCollection.items;

      let idsString = '';
      let artists = [];

      contentfulArtists.forEach((artist) => {
        idsString = idsString.concat(artist.artistId + ',');
      });

      // Remove last comma from id qyer
      let idQuery = { ids: idsString.slice(0, -1) };

      await getSpotifyArtist('', '', idQuery).then((response) => {
        response.artists.forEach((artist) => {
          // Get link of artist from Contentful response
          let artistLink = contentfulArtists.find(
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

      return {
        title: title,
        subtitle: subtitle,
        date: date,
        content: content,
        artists: artists,
      };
    })
    .catch(function (error) {
      console.log(error);
    });
}
