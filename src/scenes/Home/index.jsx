import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import fetchAllArtists from '../../api/fetchAllArtists';

import ArtistBanner from '../../components/ArtistBanner';
import HomeHero from './HomeHero';

const HomeContainer = styled.div`
  margin-top: 51vh;
`;

const BannerGrid = styled.div`


display: grid;
grid-template-columns: repeat(auto-fill, 300px);
justify-content: center;
grid-gap: 75px;

padding: 75px 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, 350px);
      justify-content: center;
  }
`;

const LinkComponent = styled(NavLink)`
  text-decoration: none;
`;

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  let homeComponent;

  useEffect(() => {
    // Async function that fetches all artists
    async function fetch() {
      let data = await fetchAllArtists();
      // Set Artist data
      setArtists(data);

      // Set loading to false
      setIsLoading(false);
    }

    fetch();
  }, []);

  if (!isLoading) {
    if (artists == []) {
      homeComponent = (
        <div>
          <h1>Artist not Found</h1>
          <p>Is that a new artist? Share it with the world!</p>
        </div>
      );
    } else {
      homeComponent = (
        <BannerGrid>
          {artists.map((artist) => {
            return (
              <LinkComponent key={artist.link} to={`artist/${artist.link}`}>
                <ArtistBanner artist={artist} />
              </LinkComponent>
            );
          })}
        </BannerGrid>
      );
    }
  }

  return (
    <HomeContainer>
      <HomeHero />
      <div className="container">
        {isLoading ? <h1>Loading</h1> : homeComponent}
      </div>
    </HomeContainer>
  );
}

export default Home;
