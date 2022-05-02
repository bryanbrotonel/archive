import { getSpotifyArtist } from './SpotifyArtistAPI';

const axios = require('axios').default;

export default async function fetchAllPosts() {
  // Contentful query that queries for all artists
  const query = `
    {
      postCollection(order: date_DESC) {
        items {
          sys {
            id
          }
          title
          subtitle
          content
          author
          date
          artistsCollection {
            items{
              artistId
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

      const posts = [];

      for (const post of contentfulRes) {
        const contentfulArtists = post.artistsCollection.items;

        let idsString = '';
        let artists = [];

        // Format URL
        const cleanTitle = post.title.replace(/[^a-zA-Z1-9 ]/g, '');
        const urlTitleParam = cleanTitle.replaceAll(/\s+/g, '-');
        const postLink = urlTitleParam + '-' + post.sys.id;

        contentfulArtists.forEach((artist) => {
          idsString = idsString.concat(artist.artistId + ',');
        });

        // Remove last comma from id qyer
        let idQuery = { ids: idsString.slice(0, -1) };

        await getSpotifyArtist('', '', idQuery).then((response) => {
          response.artists.forEach((artist) => {
            // Append artist data to array
            artists.push({
              name: artist.name,
              image: artist.images[0],
            });
          });
        });

        posts.push({
          id: post.sys.id,
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
          author: post.author,
          date: post.date,
          artists: artists,
          link: postLink,
        });
      }

      return posts;
    })
    .catch(function (error) {
      console.log(error);
    });
}
