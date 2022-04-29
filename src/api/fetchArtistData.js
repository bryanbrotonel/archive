import { getSpotifyArtist } from './SpotifyArtistAPI';
const axios = require('axios').default;

export default async function fetchArtistData(linkParam) {
  // Contentful query that searches artist based on link parameter
  const query = `
  query {
    artistCollection(where:{link: "${linkParam}"}){
      items{
        artistId
        artistBio
      }
    }
  }`;

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

      if (contentfulRes != null) {
        // Fetch artist data from Spotify
        const artistData = getSpotifyArtist(contentfulRes.artistId);

        // Fetch artist top tracks from Spotify
        const topTracks = getSpotifyArtist(
          contentfulRes.artistId,
          'top-tracks',
          { market: 'ES' }
        );

        return await Promise.all([artistData, topTracks]).then((values) => {
          const spotifyArtistData = values[0];
          const spotifyTopTracks = values[1];

          // Create artist object with artist data
          return {
            name: spotifyArtistData.name,
            bio: contentfulRes.artistBio,
            image: spotifyArtistData.images[1],
            tracks: spotifyTopTracks.tracks.slice(0, 3),
            url: spotifyArtistData.external_urls.spotify,
          };
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
