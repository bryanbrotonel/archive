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
          date
          content
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
      console.log(contentfulRes)

      const posts = [];
      
      contentfulRes.forEach((post) => {
        const contentfulArtists = post.artistsCollection.items;

        let idsString = '';
        let artists = [];

        contentfulArtists.forEach((artist) => {
          idsString = idsString.concat(artist.artistId + ',');
        });

        // Remove last comma from id qyer
        let idQuery = { ids: idsString.slice(0, -1) };

        getSpotifyArtist('', '', idQuery).then((response) => {
          
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

        posts.push({
          title: post.title,
          contnet: post.content,
          date: post.date,
          artists: artists,
        });

      });

      return posts;
    })
    .catch(function (error) {
      console.log(error);
    });
}
