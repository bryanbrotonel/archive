import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpotifyArtist } from '../../api/SpotifyArtistAPI';
import getContentfulData from '../../api/ContentfulDataAPI';

function Artist() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [artist, setArtist] = useState(null);

  let params = useParams();
  let dataElement;

  // Get artist parameter from url
  const linkParam = params.artistID;

  // Capitalize artist parameter
  var capitalLinkParam =
    linkParam[0].toUpperCase() + linkParam.slice(1).toLowerCase();

  const contentfulQuery = `
  query {
    artistCollection(where:{name: "${capitalLinkParam}"}){
      items{
        artistId
        artistBio
      }
    }
  }`;

  useEffect(() => {
    // Fetch artist data from Contentful
    getContentfulData(contentfulQuery, 'artistCollection').then(
      (contentfulRes) => {
        if (contentfulRes.length == 0) {
          setIsLoaded(true);
        } else {
          // Fetch artist data from Spotify
          const artistData = getSpotifyArtist(contentfulRes.artistId);

          // Fetch artist top tracks from Spotify
          const topTracks = getSpotifyArtist(
            contentfulRes.artistId,
            'top-tracks',
            { market: 'ES' }
          );

          Promise.all([artistData, topTracks]).then(function (values) {
            const spotifyArtistData = values[0];
            const spotifyTopTracks = values[1];

            // Create artist object with artist data
            setArtist({
              name: spotifyArtistData.name,
              bio: contentfulRes.artistBio,
              image: spotifyArtistData.images[0],
              genres: spotifyArtistData.genres,
              tracks: spotifyTopTracks.tracks,
              url: spotifyArtistData.external_urls.spotify,
            });
            setIsLoaded(true);
          });
        }
      }
    );
  }, []);

  if (isLoaded) {
    if (artist == null)
      dataElement = (
        <div>
          <h1>Artist not Found</h1>
          <p>Is that a new artist? Share it with the world!</p>
        </div>
      );
    else {
      const { name, bio, image, genres, tracks, url } = artist;

      dataElement = (
        <div>
          <img
            src={image.url}
            alt={`${name} - Image`}
            width={`${image.width}`}
            height={`${image.height}`}
          />
          <h1>{name}</h1>
          <h4>{genres.join(' ')}</h4>
          <p>{bio}</p>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
          <a href={url}>Listen to more {name} on Spotify</a>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <h1>Artist Page</h1>
      {dataElement}
    </div>
  );
}

export default Artist;
