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
          author
          content
          artistsCollection {
            items {
              artistId
              artistBio
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
      const {title, subtitle, date, content, author, artistsCollection} = contentfulRes
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

           let artistContentfulData = contentfulArtists.find(
            (element) => element.artistId == artist.id
          );
          // Get link of artist from Contentful response
          const artistLink = artistContentfulData.link;
          const artistBio = artistContentfulData.artistBio;

          // Append artist data to array
          artists.push({
            name: artist.name,
            image: artist.images[0],
            bio: artistBio,
            link: artistLink,
          });
        });
      });

      return {
        title: title,
        subtitle: subtitle,
        date: date,
        author: author,
        content: content,
        artists: artists,
      };
    })
    .catch(function (error) {
      console.log(error);
    });
}
