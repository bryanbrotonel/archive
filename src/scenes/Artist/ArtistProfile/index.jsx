import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import fetchArtistData from '../../../api/fetchArtistData';

import ArtistImage from '../ArtistImage';
import SpotifyTrack from '../SpotifyTrack';
import ArtistFooter from '../ArtistFooter';

const ArtistContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1vh 0;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 4rem;

    justify-content: center;

    padding: 100px 0;
  }
`;

const ArtistImageWrapper = styled.div`
  height: 100%;

  @media (min-width: 768px) {
    position: -webkit-sticky;
    position: sticky;
    top: calc(71px + 3rem);
  }
`;

const ArtistContentWrapper = styled.div`
  width: 100%;
  max-width: 556px;
`;

const ArtistName = styled.h1`
  font-size: var(--text-xxxxl);
  margin: 1rem 0;
`;

function ArtistProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState(null);

  let params = useParams();
  let artistComponent;

  // Get artist parameter from url
  const linkParam = params.artistID.toLowerCase();

  useEffect(() => {
    // Async function that fetches artistData
    async function fetch() {
      let data = await fetchArtistData(linkParam);

      // Set Artist data
      setArtist(data);

      // Set loading to false
      setIsLoading(false);
    }

    fetch();
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
          <ArtistImageWrapper>
            <ArtistImage
              url={image.url}
              width={image.width}
              height={image.height}
              alt={`${image.name} - Image`}
            />
          </ArtistImageWrapper>

          <ArtistContentWrapper>
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
            <ArtistFooter name={name} url={url} />
          </ArtistContentWrapper>
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

export default ArtistProfile;
