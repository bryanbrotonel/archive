import React, { useEffect, useState } from 'react';
import fetchAllArtists from '../../api/fetchAllArtists';
import styled from 'styled-components';
import ArtistBanner from './ArtistBanner';

const BannerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  justify-content: space-around;
`;

function Artist() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  let artistComponent;

  useEffect(() => {
    // Async function that fetches all artists
    async function fetch() {
      let data = await fetchAllArtists();
      // Set Artist data
      setData(data);

      // Set loading to false
      setIsLoading(false);
    }

    fetch();
  }, []);

  if (!isLoading) {
    if (data == []) {
      artistComponent = (
        <div>
          <h1>Artist not Found</h1>
          <p>Is that a new artist? Share it with the world!</p>
        </div>
      );
    } else {
      artistComponent = (
        <div>
          <BannerContainer>
            {data.map((artist) => {
              return <ArtistBanner key={artist.link} artist={artist} />;
            })}
          </BannerContainer>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <h1>Artists</h1>
      {isLoading ? <h1>Loading</h1> : artistComponent}
    </div>
  );
}

export default Artist;
