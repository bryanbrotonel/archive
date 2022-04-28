import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getSpotifyArtist } from '../../api/SpotifyArtistAPI';

import ArtistImage from '../../components/ArtistImage';
import SpotifyTrack from '../../components/SpotifyTrack';

const axios = require('axios').default;

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtistName = styled.h1`
  font-size: var(--text-xxxxl);
  margin: 0;
`;

const SpotifyButton = styled.a`
  display: block;
  padding: 1.5rem;
  margin: 1em 0;

  background-color: var(--colour-black);
  border: none;

  font-size: var(--text-md);
  font-family: var(--font-primary);

  text-align: center;
  text-decoration: none;
  color: var(--colour-white);
`;

function Artist() {
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState(null);

  let params = useParams();
  let artistComponent;

  // Get artist parameter from url
  const linkParam = params.artistID;

  // Capitalize artist parameter
  var capitalLinkParam =
    linkParam[0].toUpperCase() + linkParam.slice(1).toLowerCase();

  const query = `
  query {
    artistCollection(where:{name: "${capitalLinkParam}"}){
      items{
        artistId
        artistBio
      }
    }
  }`;

  useEffect(() => {
    // POST request to fetch Contentful data
    axios
      .post('/.netlify/functions/ContentfulDataAPI', {
        // Query to fetch sepcified data
        query: query,
        // Collection to fetch data from
        collection: 'artistCollection',
      })
      .then(function (response) {
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

          Promise.all([artistData, topTracks]).then(function (values) {
            const spotifyArtistData = values[0];
            const spotifyTopTracks = values[1];

            // Create artist object with artist data
            setArtist({
              name: spotifyArtistData.name,
              bio: contentfulRes.artistBio,
              image: spotifyArtistData.images[1],
              tracks: spotifyTopTracks.tracks.slice(0, 3),
              url: spotifyArtistData.external_urls.spotify,
            });
            setIsLoading(false);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (!isLoading) {
    if (artist == null)
      artistComponent = (
        <div>
          <h1>Artist not Found</h1>
          <p>Is that a new artist? Share it with the world!</p>
        </div>
      );
    else {
      const { name, bio, image, tracks, url } = artist;

      artistComponent = (
        <ArtistContainer>
          <ArtistImage
            url={image.url}
            width={image.width}
            height={image.height}
            alt={`${image.name} - Image`}
          />
          <ArtistName>{name}</ArtistName>
          <p>{bio}</p>
          <h1>Top Tracks</h1>
          <div>
            {tracks.map((track) => (
              <SpotifyTrack
                key={track.id}
                title={track.name}
                href={track.external_urls.spotify}
              />
            ))}
          </div>
          <div>
            <SpotifyButton as="button" href={url}>
              More from {name} on Spotify
            </SpotifyButton>
          </div>
        </ArtistContainer>
      );
    }
  }

  return (
    <div className="container">
      {isLoading ? <h1>Loading</h1> : artistComponent}
    </div>
  );
}

export default Artist;
